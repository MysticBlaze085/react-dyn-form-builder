import { INPUT_ENUMS, INPUT_TYPES, ITextInputModel } from '../models';

import { ControlBase } from './control-base.helper';

export class TextInputControl extends ControlBase {
  controlType: INPUT_TYPES = INPUT_ENUMS.TEXT;
  value?: string | any[] | any;

  constructor(options: ITextInputModel) {
    super(options);
    this.controlType = options.controlType || this.controlType;
    this.value = options.value || '';
  }
}
