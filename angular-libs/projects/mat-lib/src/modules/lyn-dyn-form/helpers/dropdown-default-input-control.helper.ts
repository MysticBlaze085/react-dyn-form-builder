import { IDropdownDefaultModel, IDropdownOptionModel, INPUT_ENUMS, INPUT_TYPES } from '../models';

import { ControlBase } from './control-base.helper';

export class DropdownDefaultInputControl<T> extends ControlBase {
  controlType: INPUT_TYPES = INPUT_ENUMS.DROPDOWN_DEFAULT;
  /**
   * Displays selected dropdown value
   */
  isSelected?: boolean;
  /**
   * Options for a form field dropdown selection
   */
  options: IDropdownOptionModel<T>[];
  /**
   * Turns single dropdown to multiple selector
   */
  multiple?: boolean;
  /**
   * Form field output/input value
   */
  value: T | any;

  constructor(options: IDropdownDefaultModel<T>) {
    super(options);
    this.controlType = options.controlType || this.controlType;
    this.isSelected = !!options.isSelected;
    this.label = options.label || 'Select option';
    this.multiple = options.multiple || false;
    this.options = options.options || [];
    this.value = options.value || null;
  }
}
