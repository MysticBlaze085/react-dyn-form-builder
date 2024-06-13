import { Component, Inject, OnInit, Optional, ɵSafeHtml } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FGControlBuilderHelper } from '@core/shared/modules/dyn-form-control/api/helpers';
import { DropdownFieldHelper } from '@core/shared/modules/dyn-form-control/components/dropdown-field/api';
import { FieldControlHelper, FieldControlModel } from '@core/shared/modules/dyn-form-control/components/field/api';
import { ControlBase, FormGroupBuilderHelper } from '@core/shared/modules/lyn-dyn-form/helpers';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IControlBaseModel } from '@core/shared/modules/lyn-dyn-form/models';
import { isArray, isEmpty } from 'lodash';
import { ButtonControlHelper } from '../../helpers/button-control.helper';
import { BodyTextModel } from './modal-template.model';

@Component({
  selector: 'lyn-modal-template',
  templateUrl: './modal-template.component.html',
  styleUrls: ['./modal-template.component.scss'],
})
export class ModalTemplateComponent implements OnInit {
  /**
   * variables to check whether there is a form, html, or a string
   */
  public isInnerHtmlTitle: boolean = false;
  public isInnerHtmlBody: boolean = false;
  public isForm: boolean = false;
  public form: UntypedFormGroup = new UntypedFormGroup({});

  constructor(
    public dialogRef: MatDialogRef<ModalTemplateComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      body: BodyTextModel;
      close: boolean;
      info: string;
      cancelBtnText: string;
      value: any;
      btnControl: ButtonControlHelper[];
    }
  ) {}

  public ngOnInit() {
    if (this.data) {
      this.isInnerHtmlTitle = this.checkInnerHtml(this.data.title);
      this.isInnerHtmlBody = this.checkInnerHtml(this.data.body);
      this.isForm = this.checkForm();
    }
  }
  /**
   * patch value of form
   */
  public onFormChanges(valueChanges: { [key: string]: any }) {
    const key = Object.keys(valueChanges)[0];
    this.form.get(key)?.patchValue(valueChanges[key]);
    this.form.markAllAsTouched();
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
      this.data.value = control.valueOverride;
    }

    return this.data.value;
  }
  /**
   * checks whether text is html or not
   */
  private checkInnerHtml(param: string | ɵSafeHtml): boolean {
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
    if (!isArray(this.data.body)) {
      if (this.data.body instanceof ControlBase) {
        this.form = new FormGroupBuilderHelper([this.data.body]).formGroup;
        return true;
      }
      if (this.data.body instanceof FieldControlHelper || this.data.body instanceof DropdownFieldHelper) {
        this.form = new FGControlBuilderHelper([this.data.body]).formGroup;
        return true;
      }
    } else if (isArray(this.data.body)) {
      const body = this.data.body as any[];
      if (!isEmpty(body.find((data) => data instanceof ControlBase))) {
        this.form = new FormGroupBuilderHelper(<IControlBaseModel[]>this.data.body).formGroup;
        return true;
      } else if (!isEmpty(body.find((data: any) => data instanceof FieldControlHelper || data instanceof DropdownFieldHelper))) {
        this.form = new FGControlBuilderHelper(<FieldControlModel[]>this.data.body).formGroup;
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
