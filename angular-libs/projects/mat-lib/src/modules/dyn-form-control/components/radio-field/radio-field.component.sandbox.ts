import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { FieldControlEnums, FieldControlModel, FieldTypes } from '../field/api';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FGControlBuilderHelper } from '@core/shared/modules/dyn-form-control/api/helpers';
import { sandboxOf } from 'angular-playground';
import { DynFormModule } from '../../dyn-form.module';
import { RadioFieldHelper } from './api';
import { RadioFieldModule } from './radio-field.module';

@Component({
  selector: 'lyn-sandbox',
  template: ` <div style="display: flex; flex-direction: column; justify-content: center; align-items:center; height: 100vh; gap: 0.5rem;">
    <ng-content [select]="'.selector'"></ng-content>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioFieldSandboxComponent {}

const controlInputs: FieldControlModel<FieldTypes>[] = [
  // Radio Field Group
  new RadioFieldHelper({
    controlType: FieldControlEnums.RadioGroup,
    controlName: 'radioGroup',
    required: true,
    label: 'Radio Field Group',
    validators: [Validators.required],
    fxLayoutAlign: 'center',
    fxLayout: 'row',
    options: [
      {
        key: 'key',
        value: 'value',
        dataCy: 'key'
      },
      {
        key: 'key2',
        value: 'value2',
        dataCy: 'key'
      },
      {
        key: 'key3',
        value: 'value3',
        dataCy: 'key'
      },
    ],
    value: null,
  }),
];

export default sandboxOf(RadioFieldSandboxComponent, {
  label: 'RadioFieldComponent Sandbox',
  imports: [CommonModule, BrowserAnimationsModule, ReactiveFormsModule, DynFormModule, MatButtonModule, RadioFieldModule],
}).add('Radio Field Inputs', {
  template: `<lyn-sandbox>
  <ng-container class="selector">
  <form [formGroup]="form" class="d-flex flex-column">
    <ng-container *ngFor="let control of controlConfig">
      <lyn-radio-field [width]="'450px'" [fieldControl]="control" (valueChanges)="patchForm(form, $event)"></lyn-radio-field>
    </ng-container>
   </form>
   <pre>{{form.value | json}}</pre>
  </ng-container>
  </lyn-sandbox>`,
  context: {
    form: new FGControlBuilderHelper(controlInputs).formGroup,
    btnControlSwitch: false,
    controlConfig: controlInputs,
    patchForm: (form: UntypedFormGroup, valueChanges: any) => {
      form.patchValue(valueChanges);
    },
  },
});
