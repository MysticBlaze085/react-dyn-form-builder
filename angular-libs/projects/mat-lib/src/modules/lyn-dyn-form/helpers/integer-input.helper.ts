import { IIntegerInputModel, INPUT_ENUMS, INPUT_TYPES } from '../models';

import { ControlBase } from './control-base.helper';

export class IntegerInputControl extends ControlBase {
  controlType: INPUT_TYPES = INPUT_ENUMS.INT;
  value?: number;

  constructor(options: IIntegerInputModel) {
    super(options);
    this.controlType = options.controlType || this.controlType;
    this.value = options.value || 0;
  }
}
