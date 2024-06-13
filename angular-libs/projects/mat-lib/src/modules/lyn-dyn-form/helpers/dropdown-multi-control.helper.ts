import { IDropdownMultiModel, IDropdownOptionMultiModel, INPUT_ENUMS, INPUT_TYPES } from '../models';

import { ControlBase } from './control-base.helper';

export class DropdownMultiControl extends ControlBase {
  controlType: INPUT_TYPES = INPUT_ENUMS.DROPDOWN_MULTI;
  /**
   * Display Selection All Option control
   */
  displaySelectAllOption?: boolean;
  /**
   * Displays selected dropdown value
   */
  isSelected?: boolean;
  /**
   * Options for a form field dropdown selection
   */
  options: IDropdownOptionMultiModel[];
  /**
   * Turns single dropdown to multiple selector
   */
  multiple?: boolean;
  /**
   * Form field output/input value
   */
  value: (string | null)[] | null;
  /**
   * Selected All Multiple Value
   */
  selectAllValue?: string;

  constructor(options: IDropdownMultiModel) {
    super(options);
    this.controlType = options.controlType || this.controlType;
    this.displaySelectAllOption = options.displaySelectAllOption;
    this.isSelected = !!options.isSelected;
    this.label = options.label || 'Select option';
    this.multiple = options.multiple || false;
    this.options = options.options || [];
    this.value = options.value || [];
    this.selectAllValue = options.selectAllValue || 'Select All';
  }
}
