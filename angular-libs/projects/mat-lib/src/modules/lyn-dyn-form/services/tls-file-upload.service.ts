import { BehaviorSubject, Observable, catchError, switchMap, tap, throwError } from 'rxjs';

import { CoreAPIConstants } from '@core/api';
import { FileModel } from '../models/file-upload.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastMessageService } from '@core/services';
import { cloneDeep } from 'lodash';
import { selectConfigurationId } from '@core/entity-store/profile/profile-effects';

@Injectable({
  providedIn: 'root',
})
export class TlsFileUploadService {
  private fileListSubject: BehaviorSubject<FileModel[]> = new BehaviorSubject<FileModel[]>([]);
  public fileList$: Observable<FileModel[]> = this.fileListSubject.asObservable();

  constructor(private readonly http: HttpClient, private readonly toast: ToastMessageService, private readonly store: Store) {}
  /**
   * Adds a new certificate and adds to the behavior subject
   * @param configurationId
   * @param file
   * @returns
   */
  public upload(file: FileModel): Observable<FileModel> {
    return this.store.select(selectConfigurationId).pipe(
      switchMap((id: string | undefined) => {
        if (!id) return throwError(() => 'No configuration ID found');
        return this.http.post<FileModel>(CoreAPIConstants.V0_ENDPOINT.tlsAPI(id ?? ''), file).pipe(
          catchError((err) => {
            this.toast.openToastErrorHandler(err);
            return throwError(() => err);
          }),
          tap((fileData: FileModel) => this.fileListSubject.next([...this.fileListSubject.value, fileData]))
        );
      })
    );
  }
  /**
   * Gets list of certificates and adds/updates the behavior subject
   * @param configurationId
   * @returns
   */
  public getFiles(): Observable<FileModel[]> {
    return this.store.select(selectConfigurationId).pipe(
      switchMap((id: string | undefined) => {
        if (!id) return throwError(() => 'No configuration ID found');
        return this.http.get<FileModel[]>(CoreAPIConstants.V0_ENDPOINT.tlsAPI(id)).pipe(
          catchError((err) => {
            this.toast.openToastErrorHandler(err);
            return throwError(() => err);
          }),
          tap((fileData: FileModel[]) => {
            fileData.forEach((file: FileModel) => {
              this.fileListSubject.next([...this.fileListSubject.value, file]);
            });
            this.fileListSubject.next(fileData);
          })
        );
      })
    );
  }
  /**
   * Get selected cert from list
   */
  public getSelectedFile(id: string): FileModel {
    return this.fileListSubject.value.find((file: FileModel) => id === file.id) as FileModel;
  }
  /**
   * Deletes a certificate and removes from behavior subject
   * @param configurationId
   * @param id
   * @returns
   */
  public deleteFile(id: string): Observable<FileModel> {
    return this.http.delete<FileModel>(CoreAPIConstants.V0_ENDPOINT.baseTLSPath(id)).pipe(
      catchError((err) => {
        this.toast.openToastErrorHandler(err);
        return throwError(() => err);
      }),
      tap(() => {
        const filterRemovedTLS = cloneDeep(this.fileListSubject.value.filter((tls) => tls.id !== id));
        this.fileListSubject.next([]);
        this.fileListSubject.next(filterRemovedTLS);
      })
    );
  }
  /**
   * Update a certificate and removes from behavior subject
   * @param configurationId
   * @param id
   * @returns
   */
  public updateFile(id: string, fileChanges: any): Observable<FileModel> {
    return this.http.put<FileModel>(`${CoreAPIConstants.V0_ENDPOINT.baseTLSPath(id)}`, fileChanges).pipe(
      catchError((err) => {
        this.toast.openToastErrorHandler(err);
        return throwError(() => err);
      }),
      tap((updateResponse: FileModel) => {
        const mapFileList = cloneDeep(
          this.fileListSubject.value.map((file: FileModel) => {
            if (file.id === updateResponse.id) {
              return updateResponse;
            }
            return file;
          })
        );
        this.fileListSubject.next([]);
        this.fileListSubject.next(mapFileList);
      })
    );
  }
}
