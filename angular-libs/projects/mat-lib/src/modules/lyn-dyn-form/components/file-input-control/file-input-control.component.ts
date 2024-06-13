import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FileModel, FileUploadModel } from '@core/shared/modules/lyn-dyn-form/models/file-upload.model';
import { INPUT_APPEARANCE_ENUMS, INPUT_APPEARANCE_TYPES } from '@core/shared/modules/lyn-dyn-form/models';
import { Observable, Subscription, take, tap } from 'rxjs';

import { EditFileComponent } from './edit-file/edit-file.component';
import { FileIcons } from './api/file-input-control.constants';
import { MatSelect } from '@angular/material/select';
import { Modal } from '@core/shared/modules/dyn-modal/helpers';
import { ModalService } from '@core/shared/modules/dyn-modal/services';
import { TlsFileUploadService } from '@core/shared/modules/lyn-dyn-form/services';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'lyn-file-input-control',
  templateUrl: './file-input-control.component.html',
  styleUrls: ['./file-input-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputControlComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('fileUpload', { static: true }) fileUpload!: MatSelect;

  /**
   * Control form value
   */
  @Input() public formValue!: string;
  /**
   * Reactive form field control configuration
   */
  @Input() public fieldControl!: FileUploadModel;
  /**
   * Sets field input appearance
   */
  @Input() public inputAppearance: INPUT_APPEARANCE_TYPES = INPUT_APPEARANCE_ENUMS.OUTLINE;
  /**
   * Outputs form field control value on a triggered change event
   */
  @Output() public valueChanges = new EventEmitter();
  /**
   * Controller for file input
   */
  public formControl!: { [key: string]: UntypedFormControl };
  /**
   * Selected file list of values
   */
  public selectedFiles: FileModel[] = [];
  /**
   * Dropdown display after service is called
   */
  public progressInfos: FileModel[] = [];
  /**
   * Progress info files
   */
  public progressInfos$!: Observable<FileModel[]>;
  /**
   * Configuration Identifier Observable
   */
  public configurationId$!: Observable<string | null>;
  /**
   * File icon controls
   */
  public fileIcons = FileIcons;
  constructor(private readonly tlsFileUploadService: TlsFileUploadService, private readonly modalService: ModalService) {}
  /**
   * Subscribes to form value changes after view initialized
   */
  public ngAfterViewInit() {
    if (this.fieldControl && this.formControl) {
      this.formControl[this.fieldControl.controlName].valueChanges.subscribe((formControlValue: any) => {
        this.valueChanges.emit({ [this.fieldControl.controlName]: formControlValue });
      });
    }
  }
  /**
   * Updates values on change
   */
  public ngOnChanges({ fieldControl, formValue }: SimpleChanges) {
    if (formValue?.currentValue) this.formValue = this.mapUriToGuid(formValue.currentValue);
    if (fieldControl?.currentValue) {
      this.fieldControl = fieldControl.currentValue;
      this.formControl = {
        [this.fieldControl.controlName]: new UntypedFormControl(this.formValue ?? null, this.fieldControl.validators),
      };
    }
  }
  /** remap uri to a guid */
  private mapUriToGuid(formValue: string) {
    if (formValue.includes('/')) {
      const str = formValue.split('/');
      return str[str.length - 1];
    } else {
      return formValue;
    }
  }
  /**
   * Set values on init
   */
  public ngOnInit() {
    this.initialize();
    this.progressInfos$ = this.tlsFileUploadService.fileList$.pipe(
      tap((files: FileModel[]) => {
        files.forEach((file: FileModel) => {
          this.progressInfos.push(file);
        });
      })
    );
  }
  /**
   * Initial file input control values
   */
  private initialize() {
    this.tlsFileUploadService.getFiles().subscribe({
      complete: () => console.info('HTTP Get TLS Files Completed'),
    });
  }
  /**
   * Add, Update, and Delete File Modifier
   */
  public modifyFile(data: { type: string; tls: FileModel | null }) {
    const dataName = data.tls ? data.tls.name : 'New Server Certificate';
    const classColor = data.type === 'Delete' ? 'warn' : 'success';
    const titleText =
      data.type === 'Add'
        ? `${data.type} <span class="${classColor}"><em>'${dataName}'</em></span>`
        : `${data.type} <span class="${classColor}"><em>'${dataName}'</em></span> Server Certificate`;
    this.modalService
      .openModal(
        new Modal(
          EditFileComponent,
          {
            title: titleText,
            dataCy: '',
          },
          {
            hasBackdrop: true,
            data: data,
          }
        )
      )
      .subscribe({
        next: (results: { type: string; file: FileModel }) => {
          if (results.type === 'Add') {
            this.selectFile(results.file);
          }
          if (results.type === 'Delete') {
            this.deleteFile(results.file.id ?? '');
          }
          if (results.type === 'Update') {
            this.updateSelectedFile(results.file);
          }
        },
      });
  }
  /**
   * Gets selected file
   */
  public getSelectedFile(id: string): FileModel {
    return this.tlsFileUploadService.getSelectedFile(id);
  }
  /**
   * Select added/edited file
   */
  private selectFile(file: FileModel) {
    this.upload(file);
  }
  /**
   * Calls service and sets dropdown values
   */
  private upload(file: FileModel) {
    const fileReader = new FileReader();
    fileReader.onload = (_) => {
      this.tlsFileUploadService
        .upload(file)
        .pipe(take(1))
        .subscribe({
          next: (result: FileModel) => {
            this.formControl[this.fieldControl.controlName].reset();
            this.formControl[this.fieldControl.controlName].patchValue(result.id);
          },
          complete: () => console.info('HTTP POST TLS File Completed'),
        });
    };
    if (file.file) fileReader.readAsText(file.file);
  }
  /**
   * Removes item
   */
  private deleteFile(id: string): Subscription {
    return this.tlsFileUploadService.deleteFile(id).subscribe({
      next: () => this.formControl[this.fieldControl.controlName].reset(),
      complete: () => console.info('HTTP Delete File Completed'),
    });
  }
  /**
   * Update tls object
   */
  private updateSelectedFile(file: FileModel) {
    return this.tlsFileUploadService.updateFile(file.id ?? '', file).subscribe({
      complete: () => console.info('HTTPS Update File Completed'),
    });
  }
}
