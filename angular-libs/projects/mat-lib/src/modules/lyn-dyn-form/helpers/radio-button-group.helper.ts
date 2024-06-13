import { INPUT_ENUMS, INPUT_TYPES, IRadioButtonGroupInputModel, IRadioOptionModel } from '../models';

import { ControlBase } from './control-base.helper';

export class RadioButtonGroupInputControl extends ControlBase {
  controlType: INPUT_TYPES = INPUT_ENUMS.RADIO_GROUP;
  options: IRadioOptionModel[] = [];
  value?: any;

  constructor(options: IRadioButtonGroupInputModel) {
    super(options);
    this.controlType = options.controlType || this.controlType;
    this.value = options.value;
    this.options = options.options || this.options;
  }
}
