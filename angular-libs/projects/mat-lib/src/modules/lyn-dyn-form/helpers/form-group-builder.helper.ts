import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { IControlBaseModel } from '../models';

const fb: UntypedFormBuilder = new UntypedFormBuilder();

export class FormGroupBuilderHelper {
  formGroup: UntypedFormGroup;

  constructor(inputs: IControlBaseModel[]) {
    this.formGroup = this.setFormGroup(inputs) || fb.group({});
  }

  private setFormGroup(inputConfigs: IControlBaseModel[]): UntypedFormGroup {
    const formGroup = fb.group({});
    inputConfigs.forEach((inputConfig: IControlBaseModel) => {
      if (inputConfig.controlName.includes('.')) {
        const strSplit = inputConfig.controlName.split('.');
        if (!formGroup.get(strSplit[0])) {
          formGroup.addControl(strSplit[0], fb.group({}));
        }
        if (formGroup.get(strSplit[0])) {
          const nestedFormGroup = formGroup.get(strSplit[0]) as UntypedFormGroup;
          if (strSplit.length === 2) {
            if (!inputConfig.disabled) {
              nestedFormGroup.addControl(strSplit[1], fb.control(inputConfig.value || null, inputConfig.validators));
            } else {
              nestedFormGroup.addControl(
                strSplit[1],
                new UntypedFormControl({ value: inputConfig.value || null, disabled: inputConfig.disabled })
              );
            }
          } else if (strSplit.length === 3) {
            nestedFormGroup.addControl(strSplit[1], fb.group({}));
            if (nestedFormGroup.get(strSplit[1])) {
              const childNestedFormGroup = nestedFormGroup.get(strSplit[1]) as UntypedFormGroup;
              if (!inputConfig.disabled) {
                childNestedFormGroup.addControl(strSplit[2], fb.control(inputConfig.value || null, inputConfig.validators));
              } else {
                childNestedFormGroup.addControl(
                  strSplit[2],
                  new UntypedFormControl({ value: inputConfig.value || null, disabled: inputConfig.disabled })
                );
              }
            }
          }
        }
      }
      if (!inputConfig.disabled && !inputConfig.controlName.includes('.')) {
        formGroup.addControl(inputConfig.controlName, fb.control(inputConfig.value || null, inputConfig.validators));
      } else if (!inputConfig.controlName.includes('.')) {
        formGroup.addControl(
          inputConfig.controlName,
          new UntypedFormControl({ value: inputConfig.value || null, disabled: inputConfig.disabled })
        );
      }
    });
    return formGroup;
  }
}
