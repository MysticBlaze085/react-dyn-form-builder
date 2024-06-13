import { Component, OnInit, ViewChild, TemplateRef, Inject, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroupBuilderHelper } from '@core/shared/modules/lyn-dyn-form/helpers';
import { IControlBaseModel } from '@core/shared/modules/lyn-dyn-form/models';
import { FileModel } from '@core/shared/modules/lyn-dyn-form/models/file-upload.model';
import { FileControls } from './edit-file.inputs';

@Component({
  selector: 'lyn-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFileComponent implements OnInit {
  @ViewChild('actionsRight', { static: true })
  public actionsRightRef!: TemplateRef<any>;
  public fileControls: IControlBaseModel[] = FileControls(false, false, 'Add Certificate');
  public form: UntypedFormGroup = new FormGroupBuilderHelper(this.fileControls).formGroup;

  constructor(
    public dialogRef: MatDialogRef<EditFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string; tls: FileModel | null }
  ) {}

  public ngOnInit() {
    if (this.data.type === 'Delete') {
      this.fileControls = FileControls(true, true, 'Delete Certificate');
      this.form = new FormGroupBuilderHelper(this.fileControls).formGroup;
      this.form.markAsDirty();
    }
    if (this.data.type === 'Update') {
      this.fileControls = FileControls(false, true, 'Update Certificate');
      this.form = new FormGroupBuilderHelper(this.fileControls).formGroup;
    }
    if ((this.data.type === 'Update' || this.data.type === 'Delete') && this.data.tls) {
      this.form.patchValue(this.data.tls);
    }
  }
  /**
   * Form value changes updates form group
   */
  public onFormChanges(valueChanges: { [key: string]: any }) {
    this.form.patchValue(valueChanges);
    this.patchFileContent(this.form?.value);
    this.form.markAsDirty();
  }
  /**
   * Reads file and sets data form control
   */
  private patchFileContent({ file }: { file: File }) {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (_) => {
        this.form.get('data')?.patchValue(<string>fileReader.result);
      };
      fileReader.readAsText(file);
    }
  }
}
