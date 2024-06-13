import { DropdownFieldControlEnums, DropdownFieldHelper } from '../../components/dropdown-field/api';
import { FieldControlEnums, FieldControlHelper } from '../../components/field/api';

import { DynFormComponent } from './dyn-form.component';
import { SimpleChange } from '@angular/core';
import { Validators } from '@angular/forms';

describe('DynFormComponent', () => {
  let component: DynFormComponent;

  beforeEach(() => {
    component = new DynFormComponent();
  });

  describe('ngOnChanges', () => {
    // Field tests
    it('should set initial formControl values', () => {
      const simpleChanges = {
        fieldControl: new SimpleChange(
          undefined,
          new FieldControlHelper({
            controlType: FieldControlEnums.Text,
            controlName: 'name',
            label: 'Name',
            placeholder: 'Name',
            required: true,
            validators: [Validators.required],
            value: 'New Gateway',
            dataCy: 'gatewayName',
          }),
          true
        ),
        formValue: new SimpleChange(undefined, 'Value Name Change', true),
      };
      component.ngOnChanges(simpleChanges);
      expect(component.formControl['name'].value).toEqual('Value Name Change');
      component.formControl['name'].patchValue('Patch Changes');
      expect(component.formControl['name'].value).toEqual('Patch Changes');
    });
    it('should set initial formControl values no formValue', () => {
      const simpleChanges = {
        fieldControl: new SimpleChange(
          undefined,
          new FieldControlHelper({
            controlType: FieldControlEnums.Text,
            controlName: 'name',
            label: 'Name',
            placeholder: 'Name',
            required: true,
            validators: [Validators.required],
            value: 'New Gateway',
            dataCy: 'gatewayName',
          }),
          true
        ),
        formValue: new SimpleChange(undefined, undefined, true),
      };
      component.ngOnChanges(simpleChanges);
      expect(component.formControl['name'].value).toEqual('New Gateway');
      component.formControl['name'].patchValue('Patch Changes');
      expect(component.formControl['name'].value).toEqual('Patch Changes');
    });
    // Dropdown tests
    it('should set initial formControl values for DefaultDropdown', () => {
      const simpleChanges = {
        fieldControl: new SimpleChange(
          undefined,
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
          true
        ),
        formValue: new SimpleChange(undefined, 'value3', true),
      };
      component.ngOnChanges(simpleChanges);
      expect(component.formControl['dropdown'].value).toEqual('value3');
      component.formControl['dropdown'].patchValue('value');
      expect(component.formControl['dropdown'].value).toEqual('value');
    });
    it('should set initial formControl values for Autocomplete', () => {
      const simpleChanges = {
        fieldControl: new SimpleChange(
          undefined,
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
          true
        ),
        formValue: new SimpleChange(undefined, 'value', true),
      };
      component.ngOnChanges(simpleChanges);
      expect(component.formControl['autocompleteDropdown'].value).toEqual('value');
      component.formControl['autocompleteDropdown'].patchValue('value2');
      expect(component.formControl['autocompleteDropdown'].value).toEqual('value2');
    });
    it('should set initial formControl values for DropdownOptionGroups', () => {
      const simpleChanges = {
        fieldControl: new SimpleChange(
          undefined,
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
          true
        ),
        formValue: new SimpleChange(undefined, 'value', true),
      };
      component.ngOnChanges(simpleChanges);
      expect(component.formControl['dropdownGroup'].value).toEqual('value');
      component.formControl['dropdownGroup'].patchValue('value2');
      expect(component.formControl['dropdownGroup'].value).toEqual('value2');
    });
    it('should set initial formControl values for MultiDropdown', () => {
      const simpleChanges = {
        fieldControl: new SimpleChange(
          undefined,
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
          true
        ),
        formValue: new SimpleChange(undefined, ['value', 'value2', 'value3'], true),
      };
      component.ngOnChanges(simpleChanges);
      expect(component.formControl['dropdownMulti'].value).toEqual(['value', 'value2', 'value3']);
    });
  });
});
