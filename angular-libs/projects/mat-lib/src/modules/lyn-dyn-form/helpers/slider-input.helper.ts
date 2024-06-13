import { INPUT_ENUMS, INPUT_TYPES, ISliderInputModel } from '../models';

import { ControlBase } from './control-base.helper';

export class SliderInputControl extends ControlBase {
  controlType: INPUT_TYPES = INPUT_ENUMS.SLIDER;
  value?: boolean;

  constructor(options: ISliderInputModel) {
    super(options);
    this.controlType = options.controlType || this.controlType;
    this.value = options.value || false;
  }
}
