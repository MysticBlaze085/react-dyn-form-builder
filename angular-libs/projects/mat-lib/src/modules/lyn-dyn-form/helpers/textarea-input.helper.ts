import { INPUT_ENUMS, INPUT_TYPES, ITextareaInput } from '../models';

import { ControlBase } from './control-base.helper';

export class TextareaInputControl extends ControlBase {
  controlType: INPUT_TYPES = INPUT_ENUMS.TEXTAREA;
  value?: string;
  constructor(options: ITextareaInput) {
    super(options);
    this.controlType = options.controlType || this.controlType;
    this.value = options.value;
  }
}
