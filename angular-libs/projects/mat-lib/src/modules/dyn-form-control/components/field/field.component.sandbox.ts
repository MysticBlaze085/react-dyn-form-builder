import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FGControlBuilderHelper, FormValidationHelper } from '@core/shared/modules/dyn-form-control/api/helpers';
import { FieldControlEnums, FieldControlHelper, FieldControlModel, FieldTypes } from './api';
import { IconEventEnums, InsightColorEnums, InsightIconEnums, TextIconEnums } from '@core/shared/modules/lyn-insight-icon/models';
import { ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FieldModule } from './field.module';
import { Guid } from 'guid-typescript';
import { MatButtonModule } from '@angular/material/button';
import { sandboxOf } from 'angular-playground';

@Component({
  selector: 'lyn-sandbox',
  template: ` <div style="display: flex; flex-direction: column; justify-content: center; align-items:center; height: 100vh; gap: 0.5rem;">
    <ng-content [select]="'.selector'"></ng-content>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldSandboxComponent {}

const controlInputs: FieldControlModel<FieldTypes>[] = [
  // hidden Text
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'hidden',
    hidden: true,
    required: true,
    validators: [Validators.required],
    value: Guid.create(),
    disabled: true,
  }),
  // basic Text with custom validation for 256 characters
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'name',
    hint: 'Name.',
    info: 'The name field contains the name.',
    label: 'Name',
    placeholder: 'Name',
    required: true,
    validators: [Validators.required, new FormValidationHelper().maxCharacterLength(256)],
    dataCy: 'name',
    value: 'Name Value',
  }),
  // basic Text with custom validations and angular validation
  new FieldControlHelper<string>({
    controlType: FieldControlEnums.Text,
    controlName: 'baseUrlPattern',
    errorMessage: 'Base Path is required and less than 50 characters',
    hint: 'Uniquely identify your gateway address.',
    info: 'The Base URL Pattern field is the URL paths that will be added to the domain name and “rapid.lyniate.com” to uniquely identify your gateway address. For example, if you enter “/FHIR” and your domain name is “MedCo”, the path to your gateway will be “https://MedCo.rapid.lyniate.com/FHIR.”',
    label: 'Base URL Pattern',
    placeholder: 'Base URL Patter',
    required: true,
    validators: [
      Validators.required,
      Validators.maxLength(50),
      new FormValidationHelper().baseUrlPatternValidator(),
      new FormValidationHelper().noWhitespaceValidator(),
    ],
    dataCy: 'basePath',
    value: null,
  }),
  // Insight Text
  new FieldControlHelper<string>({
    controlType: FieldControlEnums.InsightText,
    controlName: `insightText`,
    errorMessage: 'insightText Path is required',
    icon: {
      type: TextIconEnums.SUFFIX,
      color: InsightColorEnums.INFO,
      icon: InsightIconEnums.INFO,
      eventType: IconEventEnums.WARNING,
      text: 'HTTPS is recommended for secure communications',
    },
    hint: 'Fully qualified address to which the messages are received.',
    info: 'The insightText URL field is the fully qualified address to which the messages that are received on the gateway will be passed. This field is required and must include the entire path to the endpoint. For example, “http://rapid.lyniate.com.”',
    label: 'Insight Text Path',
    required: true,
    placeholder: 'Insight Text Path',
    validators: [
      Validators.required,
      new FormValidationHelper().httpsIconHintValidation(),
      new FormValidationHelper().httpsOrHttpValidation(),
    ],
    dataCy: 'endpointPath',
    value: null,
  }),
  // Clear icon
  new FieldControlHelper<string>({
    controlType: FieldControlEnums.InsightText,
    controlName: `insightIconText`,
    errorMessage: 'insightIconText Path is required',
    icon: {
      type: TextIconEnums.SUFFIX,
      color: InsightColorEnums.DEFAULT,
      icon: InsightIconEnums.CANCEL,
      eventType: IconEventEnums.CANCEL,
      text: 'HTTPS is recommended for secure communications',
    },
    label: 'Insight Clear Icon Text Path',
    required: true,
    placeholder: 'Insight Clear Icon Text Path',
    validators: [],
    dataCy: 'endpointPath',
    value: null,
  }),
  // Password Text
  new FieldControlHelper<string>({
    controlType: FieldControlEnums.Password,
    controlName: 'password',
    hint: 'Applied to the authentication header of the message',
    label: 'Password',
    placeholder: 'Password',
    required: true,
    validators: [Validators.required],
    value: null,
  }),
  // Textarea Text
  new FieldControlHelper<string>({
    controlType: FieldControlEnums.Textarea,
    controlName: 'textarea',
    hint: 'Textarea hint',
    label: 'Textarea',
    placeholder: 'Textarea',
    required: true,
    validators: [Validators.required, new FormValidationHelper().maxCharacterLength(256)],
    textareaMinRows: 5,
    textareaMaxRows: 15,
    value: null,
  }),
  // Checkbox
  new FieldControlHelper<boolean>({
    controlType: FieldControlEnums.CheckBox,
    controlName: 'checkbox',
    hint: 'Turn on or off',
    label: 'Enable',
    placeholder: 'Enable',
    required: true,
    validators: [Validators.required],
    value: false,
  }),
  // Nested FormGroup Value Inputs
  new FieldControlHelper<string>({
    controlType: FieldControlEnums.Text,
    controlName: 'nested.childOneDot',
    label: 'Nested Child',
    placeholder: 'Nested Child',
    required: true,
    validators: [Validators.required],
    value: null,
  }),
  new FieldControlHelper<string>({
    controlType: FieldControlEnums.Text,
    controlName: 'nested.child.twoDots',
    label: 'Nested Child Three',
    placeholder: 'Nested Child Three',
    required: true,
    validators: [Validators.required],
    value: null,
  }),
];

export default sandboxOf(FieldSandboxComponent, {
  label: 'FieldComponent Sandbox',
  imports: [CommonModule, BrowserAnimationsModule, ReactiveFormsModule, FieldModule, MatButtonModule],
}).add('Field Inputs', {
  template: `<lyn-sandbox>
  <ng-container class="selector">
  <form [formGroup]="form" class="d-flex flex-column" >
    <ng-container *ngFor="let control of controlConfig">
      <lyn-field *ngIf="!control.hidden && !control.controlName.includes('.')"  [width]="'450px'" [fieldControl]="control" (valueChanges)="form.patchValue($event)"></lyn-field>
      <ng-container *ngTemplateOutlet="datastore; context:{form: form, control: control}"></ng-container>
    </ng-container>
   </form>
   <pre>{{form.value | json}}</pre>
  </ng-container>
  <ng-template #datastore let-form="form" let-control="control">
     <lyn-field
        *ngIf="!control.hidden && control.controlName.includes('.')"
        width="100%"
        [fieldControl]="control"
        [formValue]="form.get(getControlName(control))?.value"
        (valueChanges)="patchForm(form, $event)"
      ></lyn-field>
    </ng-template>
  </lyn-sandbox>`,
  context: {
    form: new FGControlBuilderHelper(controlInputs).formGroup,
    btnControlSwitch: false,
    controlConfig: controlInputs,
    getControlName: (input: FieldControlModel<FieldTypes>) => {
      if (input.controlName.includes('.')) {
        const isSplit = input.controlName.split('.');
        if (isSplit.length > 1) {
          return input.controlName.split('.')[2];
        } else {
          return input.controlName.split('.')[1];
        }
      } else {
        return input.value;
      }
    },
    patchForm: (form: UntypedFormGroup, valueChanges: any) => {
      const isValue = Object.keys(valueChanges)[0];
      if (isValue.includes('.')) {
        const isSplit = isValue.split('.');
        if (isSplit.length === 2) {
          form.get(isSplit[0])?.get(isSplit[1])?.patchValue(valueChanges[isValue]);
        }
        if (isSplit.length === 3) {
          form.get(isSplit[0])?.get(isSplit[1])?.get(isSplit[2])?.patchValue(valueChanges[isValue]);
        }
      } else {
        form.patchValue(valueChanges);
      }
    },
  },
});
