import { IDropdownOptionGroup, IDropdownOptionGroupModel, INPUT_ENUMS, INPUT_TYPES } from '../models';

import { ControlBase } from './control-base.helper';

export class DropdownOptionGroupInputControl<T> extends ControlBase {
  controlType: INPUT_TYPES = INPUT_ENUMS.DROPDOWN_OPTION_GROUP;
  /**
   * Options for a form field dropdown selection
   */
  options?: IDropdownOptionGroup<T>[];
  /**
   * Turns single dropdown to multiple selector
   */
  multiple?: boolean;
  /**
   * Form field output/input value
   */
  value: T | any;
  constructor(options: IDropdownOptionGroupModel<T>) {
    super(options);
    this.controlType = options.controlType || this.controlType;
    this.label = options.label || 'Select option';
    this.multiple = options.multiple || false;
    this.options = options.options || [];
    this.value = options.value || null;
  }
}
