import { FieldControlEnums } from '../field/api';
import { RadioFieldComponent } from './radio-field.component';
import { RadioFieldHelper } from './api/radio-field.helper';
import { SimpleChange } from '@angular/core';
import { Validators } from '@angular/forms';

describe('RadioFieldComponent', () => {
  let component: RadioFieldComponent;

  beforeEach(() => {
    component = new RadioFieldComponent();
  });

  describe('onChanges', () => {
    it('should set initial formControl values', () => {
      const simpleChanges = {
        fieldControl: new SimpleChange(
          undefined,
          new RadioFieldHelper({
            controlType: FieldControlEnums.RadioGroup,
            controlName: 'name',
            label: 'Name',
            placeholder: 'Name',
            required: true,
            validators: [Validators.required],
            value: false,
            options: [],
            dataCy: 'gatewayName',
          }),
          true
        ),
        formValue: new SimpleChange(undefined, true, true),
      };
      component.ngOnChanges(simpleChanges);
      expect(component.formControl['name'].value).toBeTruthy();
      component.formControl['name'].patchValue(false);
      expect(component.formControl['name'].value).toBeFalsy();
    });

    it('should set initial formControl values no formValue', () => {
      const simpleChanges = {
        fieldControl: new SimpleChange(
          undefined,
          new RadioFieldHelper({
            controlType: FieldControlEnums.RadioGroup,
            controlName: 'name',
            label: 'Name',
            placeholder: 'Name',
            required: true,
            validators: [Validators.required],
            value: false,
            options: [],
            dataCy: 'gatewayName',
          }),
          true
        ),
        formValue: new SimpleChange(undefined, undefined, true),
      };
      component.ngOnChanges(simpleChanges);
      expect(component.formControl['name'].value).toBeFalsy();
      component.formControl['name'].patchValue(true);
      expect(component.formControl['name'].value).toBeTruthy();
    });
  });

  describe('onResetFormValue', () => {
    beforeEach(() => {
      const simpleChanges = {
        fieldControl: new SimpleChange(
          undefined,
          new RadioFieldHelper({
            controlType: FieldControlEnums.RadioGroup,
            controlName: 'name',
            label: 'Name',
            placeholder: 'Name',
            required: true,
            validators: [Validators.required],
            value: false,
            options: [],
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
