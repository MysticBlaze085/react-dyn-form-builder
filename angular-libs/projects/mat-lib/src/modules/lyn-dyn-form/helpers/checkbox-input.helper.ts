import { INPUT_ENUMS, INPUT_TYPES } from '../models';

import { ICheckboxInputModel } from '../models/checkbox-input.model';
import { ControlBase } from './control-base.helper';

export class CheckboxInputControl extends ControlBase {
  controlType: INPUT_TYPES = INPUT_ENUMS.CHECKBOX;
  value?: boolean;

  constructor(options: ICheckboxInputModel) {
    super(options);
    this.controlType = options.controlType || this.controlType;
    this.value = options.value || false;
  }
}
