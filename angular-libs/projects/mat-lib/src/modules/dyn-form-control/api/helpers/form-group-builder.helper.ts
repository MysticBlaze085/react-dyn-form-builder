import { FieldControlModel, FieldTypes } from '../../components/field/api';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

const fb: FormBuilder = new FormBuilder();

export class FGControlBuilderHelper {
  public formGroup: FormGroup = fb.group({});

  constructor(inputs: FieldControlModel<FieldTypes>[]) {
    this.formGroup = this.setFormGroup(inputs);
  }
  /**
   * Builds out a form group from the FieldControlModel<FieldTypes> array
   */
  private setFormGroup(inputConfigs: FieldControlModel<FieldTypes>[]): FormGroup {
    inputConfigs.forEach((inputConfig: FieldControlModel<FieldTypes>) => {
      if (inputConfig.controlName.includes('.')) {
        this.checkSingleDotExist(inputConfig);
      } else if (!inputConfig.disabled) {
        this.formGroup.addControl(inputConfig.controlName, fb.control(inputConfig.value || null, inputConfig.validators));
      } else if (inputConfig.disabled) {
        this.formGroup.addControl(
          inputConfig.controlName,
          new FormControl({ value: inputConfig.value || null, disabled: inputConfig.disabled })
        );
      }
    });
    return this.formGroup;
  }
  /**
   * Checks single . exists and added a control with form group value
   */
  private checkSingleDotExist(inputConfig: FieldControlModel<FieldTypes>) {
    const strSplit = inputConfig.controlName.split('.');
    if (!this.formGroup.get(strSplit[0])) {
      this.formGroup.addControl(strSplit[0], fb.group({}));
    }
    if (this.formGroup.get(strSplit[0])) {
      this.setNestedFB(inputConfig, strSplit);
    }
  }
  /**
   * Sets two . nested form groups.
   */
  private setNestedFB(inputConfig: FieldControlModel<FieldTypes>, strSplit: string[]) {
    const nestedFormGroup = this.formGroup.get(strSplit[0]) as FormGroup;
    if (strSplit.length === 2) {
      if (!inputConfig.disabled) {
        nestedFormGroup.addControl(strSplit[1], fb.control(inputConfig.value || null, inputConfig.validators));
      } else {
        nestedFormGroup.addControl(strSplit[1], new FormControl({ value: inputConfig.value || null, disabled: inputConfig.disabled }));
      }
    } else if (strSplit.length === 3) {
      this.setNestedFBThree(inputConfig, strSplit, nestedFormGroup);
    }
  }
  /**
   * Sets three . nested form groups
   */
  private setNestedFBThree(inputConfig: FieldControlModel<FieldTypes>, strSplit: string[], nestedFormGroup: FormGroup) {
    nestedFormGroup.addControl(strSplit[1], fb.group({}));
    if (nestedFormGroup.get(strSplit[1])) {
      const childNestedFormGroup = nestedFormGroup.get(strSplit[1]) as FormGroup;
      if (!inputConfig.disabled) {
        childNestedFormGroup.addControl(strSplit[2], fb.control(inputConfig.value || null, inputConfig.validators));
      } else if (inputConfig.disabled) {
        childNestedFormGroup.addControl(strSplit[2], new FormControl({ value: inputConfig.value || null, disabled: inputConfig.disabled }));
      }
    }
  }
}
