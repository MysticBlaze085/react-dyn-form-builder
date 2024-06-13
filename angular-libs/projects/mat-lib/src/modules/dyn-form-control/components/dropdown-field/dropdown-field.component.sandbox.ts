import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DropdownFieldControlEnums } from './api/dropdown-field-control.enums';
import { DropdownFieldHelper } from './api';
import { DropdownFieldModule } from './dropdown-field.module';
import { FGControlBuilderHelper } from '@core/shared/modules/dyn-form-control/api/helpers';
import { MatButtonModule } from '@angular/material/button';
import { sandboxOf } from 'angular-playground';

@Component({
  selector: 'lyn-sandbox',
  template: ` <div style="display: flex; flex-direction: column; justify-content: center; align-items:center; height: 100vh; gap: 0.5rem;">
    <ng-content [select]="'.selector'"></ng-content>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxDropdownFieldComponent {}

const controlInputs = [
  // basic dropdown
  new DropdownFieldHelper({
    controlType: DropdownFieldControlEnums.DefaultDropdown,
    controlName: 'dropdown',
    hint: 'Dropdown List',
    info: 'Info of dropdown',
    isMultiple: false,
    label: 'Dropdown',
    placeholder: 'Dropdown',
    required: true,
    validators: [Validators.required],
    dataCy: 'gatewayName',
    value: 'value2',
    options: [
      { isOptionGroup: false, key: 'key', value: 'value', dataCy: 'default-key-value-pair' },
      { isOptionGroup: false, key: 'key2', value: 'value2', dataCy: 'default-key-value-pair' },
      { isOptionGroup: false, key: 'key3', value: 'value3', dataCy: 'default-key-value-pair' },
    ],
  }),
  // multi dropdown
  new DropdownFieldHelper({
    controlType: DropdownFieldControlEnums.MultiDropdown,
    controlName: 'dropdownMulti',
    hint: 'Multi-Dropdown List',
    info: 'Info of dropdown',
    isMultiple: true,
    isSelectAllOptions: true,
    selectAllDisplay: 'Select',
    label: 'Multi-Dropdown',
    placeholder: 'Multi-Dropdown',
    required: true,
    validators: [Validators.required],
    dataCy: 'gatewayName',
    value: [],
    options: [
      { isOptionGroup: false, key: 'key', value: 'value', dataCy: 'default-key-value-pair' },
      { isOptionGroup: false, key: 'key2', value: 'value2', dataCy: 'default-key-value-pair' },
      { isOptionGroup: false, key: 'key3', value: 'value3', dataCy: 'default-key-value-pair' },
    ],
  }),
  // option groups dropdown
  new DropdownFieldHelper({
    controlType: DropdownFieldControlEnums.DropdownOptionGroups,
    controlName: 'dropdownGroup',
    hint: 'Group-Dropdown List',
    info: 'Info of dropdown',
    isMultiple: false,
    label: 'Group-Dropdown',
    placeholder: 'Group-Dropdown',
    required: true,
    validators: [Validators.required],
    dataCy: 'gatewayName',
    value: '',
    options: [
      {
        isOptionGroup: true,
        optgroupLabel: 'Group',
        options: [
          { key: 'key', value: 'value', dataCy: 'default-key-value-pair' },
          { key: 'key2', value: 'value2', dataCy: 'default-key-value-pair' },
          { key: 'key3', value: 'value3', dataCy: 'default-key-value-pair' },
        ],
      },
    ],
  }),
  // autocomplete dropdown with custom validation
  new DropdownFieldHelper({
    controlType: DropdownFieldControlEnums.Autocomplete,
    controlName: 'autocompleteDropdown',
    hint: 'Autocomplete Dropdown List',
    info: 'Info of dropdown',
    isMultiple: true,
    isSelectAllOptions: true,
    selectAllDisplay: 'Select',
    label: 'Autocomplete Dropdown',
    placeholder: 'Autocomplete Dropdown',
    required: true,
    validators: [Validators.required],
    dataCy: 'gatewayName',
    value: [],
    options: [
      { isOptionGroup: false, key: 'key', value: 'value', dataCy: 'default-key-value-pair' },
      { isOptionGroup: false, key: 'key2', value: 'value2', dataCy: 'default-key-value-pair' },
      { isOptionGroup: false, key: 'key3', value: 'value3', dataCy: 'default-key-value-pair' },
    ],
  }),
];

export default sandboxOf(SandboxDropdownFieldComponent, {
  label: 'DynFormControl Sandbox',
  imports: [CommonModule, BrowserAnimationsModule, DropdownFieldModule, ReactiveFormsModule, DropdownFieldModule, MatButtonModule],
}).add('Dropdown Inputs', {
  template: `<lyn-sandbox>
  <ng-container class="selector">
  <form [formGroup]="form" class="d-flex flex-column">
      <lyn-dropdown-field *ngFor="let control of controlConfig" [width]="'450px'" [fieldControl]="control" (valueChanges)="form.patchValue($event)"></lyn-dropdown-field>
   </form>
   <pre>{{form.value | json}}</pre>
  </ng-container>
  </lyn-sandbox>`,
  context: {
    form: new FGControlBuilderHelper(controlInputs).formGroup,
    btnControlSwitch: false,
    controlConfig: controlInputs,
  },
});
