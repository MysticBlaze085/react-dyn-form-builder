import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild, ɵSafeHtml } from '@angular/core';

import { UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FGControlBuilderHelper } from '@core/shared/modules/dyn-form-control/api/helpers';
import { DropdownFieldHelper } from '@core/shared/modules/dyn-form-control/components/dropdown-field/api';
import { FieldControlHelper, FieldControlModel } from '@core/shared/modules/dyn-form-control/components/field/api';
import { ControlBase, FormGroupBuilderHelper } from '@core/shared/modules/lyn-dyn-form/helpers';
import { IControlBaseModel } from '@core/shared/modules/lyn-dyn-form/models';
import { isArray, isEmpty } from 'lodash';
import { BodyTextModel, ModalTemplateModel } from '../modal-template/modal-template.model';

@Component({
  selector: 'lyn-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
})
export class ModalWrapperComponent implements OnChanges {
  @ViewChild('wrapper') template!: TemplateRef<any>;
  @Input() public modalOptions!: ModalTemplateModel<any>;
  @Input() public contentProjection: boolean = false;
  /**
   * confirmedValues outputs filter value to parent
   */
  @Output() public confirmedValues: EventEmitter<any> = new EventEmitter<any>();

  /**
   * dialogRef for dialog pop up
   */
  public dialogRef!: MatDialogRef<TemplateRef<any>>;
  /**
   * variables to check whether there is a form, html, or a string
   */
  public isInnerHtmlTitle: boolean = false;
  public isInnerHtmlBody: boolean = false;
  public isForm: boolean = false;
  public form: UntypedFormGroup = new UntypedFormGroup({});

  constructor(private dialog: MatDialog) {}

  public ngOnChanges({ modalOptions }: SimpleChanges): void {
    if (modalOptions?.currentValue) {
      this.modalOptions = modalOptions.currentValue;
      this.isInnerHtmlTitle = this.checkInnerHtml(modalOptions.currentValue.modalTitle);
      this.isInnerHtmlBody = this.checkInnerHtml(modalOptions.currentValue.bodyText);
      this.isForm = this.checkForm();
    }
  }

  public openDialog() {
    setTimeout(() => {
      if (this.modalOptions)
        this.dialog.open(this.template, {
          data: {
            title: this.modalOptions.modalTitle,
            body: this.modalOptions.bodyText,
            close: this.modalOptions.closeBtn,
            info: this.modalOptions.info,
            cancelBtnText: this.modalOptions.cancelBtnText,
            value: this.modalOptions.value,
            btnControl: this.modalOptions.btnControl,
          },
          panelClass: 'modal-template-container',
          disableClose: this.modalOptions.disableClose,
        });
    }, 500);
  }

  public closeDialog() {
    this.dialog.closeAll();
  }
  /**
   * patch value of form
   */
  public onFormChanges(valueChanges: { [key: string]: any }) {
    this.form.patchValue(valueChanges);

    /** http override validation error warning */
    if (this.form.get('endpoint')) {
      const https = (this.form.get('endpoint')?.value || '').indexOf('http://') === 0;
      if (https) this.form.get('endpoint')?.setErrors(null);
    }
  }
  public closeValue(control: any): any {
    if (this.isForm) {
      return this.form.value;
    }
    if (control.valueOverride) {
      this.modalOptions.value = control.valueOverride;
    }

    return this.modalOptions.value;
  }
  /**
   * checks whether text is html or not
   */
  private checkInnerHtml(param: string | ɵSafeHtml | undefined): boolean {
    if (typeof param === 'string') {
      const split = param.split('');
      return split.filter((element: string) => element?.includes('<')).length > 0;
    } else {
      return true;
    }
  }
  /**
   * Check whether the body is a form or not
   */
  public checkForm(): boolean {
    if (!isArray(this.modalOptions.bodyText)) {
      if (this.modalOptions.bodyText instanceof ControlBase) {
        this.form = new FormGroupBuilderHelper([this.modalOptions.bodyText]).formGroup;
        return true;
      }
      if (this.modalOptions.bodyText instanceof FieldControlHelper || this.modalOptions.bodyText instanceof DropdownFieldHelper) {
        this.form = new FGControlBuilderHelper([this.modalOptions.bodyText]).formGroup;
        return true;
      }
    } else if (isArray(this.modalOptions.bodyText)) {
      const body = this.modalOptions.bodyText as any[];
      if (!isEmpty(body.find((data) => data instanceof ControlBase))) {
        this.form = new FormGroupBuilderHelper(<IControlBaseModel[]>this.modalOptions.bodyText).formGroup;
        return true;
      } else if (!isEmpty(body.find((data: any) => data instanceof FieldControlHelper || data instanceof DropdownFieldHelper))) {
        this.form = new FGControlBuilderHelper(<FieldControlModel[]>this.modalOptions.bodyText).formGroup;
        return true;
      }
    }
    return false;
  }
  /** New form control build */
  public checkFormControls(check: BodyTextModel): boolean {
    return isArray(check)
      ? check[0] instanceof FieldControlHelper || check[0] instanceof DropdownFieldHelper
      : check instanceof FieldControlHelper || check instanceof DropdownFieldHelper;
  }
  /** Body Form is an Array */
  public isFormArray(check: BodyTextModel): boolean {
    return isArray(check);
  }
}
