import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { IControlBaseModel, INPUT_ENUMS } from '../models';

const fb = new UntypedFormBuilder();
export class BuildFormGroupControls {
  formGroup: UntypedFormGroup;
  constructor(configuration: IControlBaseModel[]) {
    this.formGroup = this.setFormGroup(configuration);
  }

  public setFormGroup(inputConfigs: IControlBaseModel[]): UntypedFormGroup {
    const formGroup = fb.group({});
    inputConfigs.forEach((inputConfig: IControlBaseModel) => {
      if (inputConfig.controlType !== INPUT_ENUMS.CHECKBOX) {
        this.defaultFormGroup(inputConfig, formGroup);
      } else {
        this.booleanFormGroup(inputConfig, formGroup);
      }
    });
    return formGroup;
  }
  /**
   * Default addControl to form group
   */
  private defaultFormGroup(inputConfig: IControlBaseModel, formGroup: UntypedFormGroup): UntypedFormGroup {
    if (!inputConfig.disabled) {
      formGroup.addControl(inputConfig.controlName, fb.control(inputConfig.value || '', inputConfig.validators));
    } else {
      formGroup.addControl(inputConfig.controlName, fb.control({ value: inputConfig.value || '', disabled: inputConfig.disabled }));
    }
    return formGroup;
  }
  /**
   * If Value is of type boolean will pass in exact value from control base model
   */
  private booleanFormGroup(inputConfig: IControlBaseModel, formGroup: UntypedFormGroup): UntypedFormGroup {
    if (!inputConfig.disabled) {
      formGroup.addControl(inputConfig.controlName, fb.control(inputConfig.value, inputConfig.validators));
    } else {
      formGroup.addControl(inputConfig.controlName, fb.control({ value: inputConfig.value, disabled: inputConfig.disabled }));
    }
    return formGroup;
  }
}
