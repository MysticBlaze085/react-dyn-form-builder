/* eslint-disable @typescript-eslint/no-empty-function */

import { DropdownFieldControlEnums, DropdownFieldHelper } from './api';
import { fakeAsync, tick } from '@angular/core/testing';

import { DropdownFieldComponent } from './dropdown-field.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SimpleChange } from '@angular/core';
import { Validators } from '@angular/forms';

describe('DropdownFieldComponent', () => {
  let component: DropdownFieldComponent;

  beforeEach(() => {
    component = new DropdownFieldComponent();
  });

  describe('onChanges', () => {
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
      component.ngAfterViewInit();
      expect(component.formControl['dropdown'].value).toEqual('value3');
      component.formControl['dropdown'].patchValue('value');
      expect(component.formControl['dropdown'].value).toEqual('value');
    });
    it('should set initial formControl values for Autocomplete', fakeAsync(() => {
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
      component.ngAfterViewInit();
      tick(1000);
      expect(component.formControl['autocompleteDropdown'].value).toEqual('value');
      component.formControl['autocompleteDropdown'].patchValue('value2');
      expect(component.formControl['autocompleteDropdown'].value).toEqual('value2');
      component.filteredOptions$.subscribe({
        next: (result) => expect(result).toEqual(component.fieldControl.options),
        complete: () => {},
      });
    }));
    it('should set initial formControl values for DropdownOptionGroups', fakeAsync(() => {
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
        formValue: new SimpleChange(undefined, { group: 'value' }, true),
      };
      component.ngOnChanges(simpleChanges);
      component.ngAfterViewInit();
      tick(1000);

      expect(component.formControl['dropdownGroup'].value).toEqual({ group: 'value' });
      component.formControl['dropdownGroup'].patchValue({ group: 'value2' });
      expect(component.formControl['dropdownGroup'].value).toEqual({ group: 'value2' });
    }));
    it('should set initial formControl values for MultiDropdown', fakeAsync(() => {
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
        formValue: new SimpleChange(undefined, ['1'], true),
      };
      component.ngOnChanges(simpleChanges);
      component.ngAfterViewInit();
      tick(1000);

      expect(component.formControl['dropdownMulti'].value).toEqual(['value', 'value2', 'value3', '1']);
      component.formControl['dropdownMulti'].patchValue(['value']);
      expect(component.formControl['dropdownMulti'].value).toEqual(['value']);
    }));
  });

  describe('AutoComplete Field Control method handlers', () => {
    beforeEach(() => {
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
      component.ngAfterViewInit();
    });

    it('should call displayFn', () => {
      expect(component.displayFn({ key: 'key', value: 'value' })).toEqual('key');
      expect(component.displayFn(undefined as any)).toEqual(undefined);
    });

    it('should emit acValueChanges', () => {
      spyOn(component.valueChanges, 'emit');
      const mockMatAcSelectedEvent = new MatAutocompleteSelectedEvent({} as any, { value: 'value2' } as any);
      component.acValueChanges(mockMatAcSelectedEvent);
      expect(component.valueChanges.emit).toHaveBeenCalled();
    });
  });

  describe('DropdownOptionGroups Field Control method handlers', () => {
    beforeEach(() => {
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
        formValue: new SimpleChange(undefined, { group: 'value' }, true),
      };
      component.ngOnChanges(simpleChanges);
      component.ngAfterViewInit();
    });

    it('should call onDropdownOptionGroupChanges', () => {
      spyOn(component.valueChanges, 'emit');
      component.onDropdownOptionGroupChanges(component.fieldControl.controlName, component.fieldControl.options, 'value');
      expect(component.valueChanges.emit).toHaveBeenCalled();
      component.onDropdownOptionGroupChanges(component.fieldControl.controlName, component.fieldControl.options, ['value', 'value2']);
      expect(component.valueChanges.emit).toHaveBeenCalled();
    });
  });

  describe('DropdownMulti Field Control method handlers', () => {
    beforeEach(() => {
      component.allSelected = jasmine.createSpyObj({ selected: 'value' });
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
        formValue: new SimpleChange(undefined, ['all'], true),
      };
      component.ngOnChanges(simpleChanges);
    });

    it('should call toggleAllSelection all should be selected', () => {
      component.toggleAllSelection();
      expect(component.formControl[component.fieldControl.controlName].value).toEqual(['value', 'value2', 'value3', 'all']);
    });

    it('should call otherOptionSelected all should be selected', fakeAsync(() => {
      component.ngAfterViewInit();

      tick(1000);
      component.otherOptionSelected();
      expect(component.fieldControl.isSelectAllOptions).toBeTruthy();
      expect(component.formControl[component.fieldControl.controlName].value).toEqual(['value', 'value2', 'value3', '1']);

      component.formControl[component.fieldControl.controlName].patchValue(['value', 'value2', 'value3']);
      component.otherOptionSelected();
      expect(component.fieldControl.isSelectAllOptions).toBeTruthy();
      expect(component.formControl[component.fieldControl.controlName].value).toEqual(['value', 'value2', 'value3', 'all']);
    }));
  });

  it('should onDestroy', () => {
    component.ngOnDestroy();
    expect(component.formControl).toBeUndefined();
  });
});
