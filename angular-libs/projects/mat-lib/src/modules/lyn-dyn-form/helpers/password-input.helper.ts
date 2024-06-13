import { INPUT_ENUMS, INPUT_TYPES, ITextInputModel } from '../models';

import { ControlBase } from './control-base.helper';

export class PasswordInputControl extends ControlBase {
  controlType: INPUT_TYPES = INPUT_ENUMS.PASSWORD;
  value?: string | any[];

  constructor(options: ITextInputModel) {
    super(options);
    this.controlType = options.controlType || this.controlType;
    this.value = options.value || '';
  }
}
