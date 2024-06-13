import { IDateInputModel, INPUT_ENUMS, INPUT_TYPES } from '../models';

import { ControlBase } from './control-base.helper';

export class DateInputControl extends ControlBase {
  controlType: INPUT_TYPES = INPUT_ENUMS.DATE_DEFAULT;
  value?: Date;

  constructor(options: IDateInputModel) {
    super(options);
    this.controlType = options.controlType || this.controlType;
    this.label = options.label || 'Choose Date';
    this.value = options.value || new Date();
  }
}
