import { Inject, Injectable, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Modal } from '../helpers';
import { ModalComponent } from '../components';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(public dialog: MatDialog, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {}
  /**
   * Opens modal component
   */
  public createModal(modal: Modal): any {
    return this.dialog.open(ModalComponent, {
      ...modal.dialog,
      data: modal,
    });
  }
  /**
   * Open modal and gives a response after modal is closed
   */
  public openModal(modal: Modal): Observable<any> {
    const dialogRef = this.dialog.open(ModalComponent, {
      ...modal.dialog,
      data: modal,
    });
    return dialogRef.afterClosed();
  }
}
