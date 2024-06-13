import { FieldControlEnums, FieldControlHelper } from './api';

import { FieldComponent } from './field.component';
import { SimpleChange } from '@angular/core';
import { Validators } from '@angular/forms';

describe('FieldComponent', () => {
  let component: FieldComponent;

  beforeEach(() => {
    component = new FieldComponent();
  });

  describe('onChanges', () => {
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
  });

  describe('onResetFormValue', () => {
    beforeEach(() => {
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
    });

    it('should call onResetFormValue', () => {
      component.onResetFormValue();
      expect(component.formControl['name'].value).toEqual(null);
    });
  });
});
