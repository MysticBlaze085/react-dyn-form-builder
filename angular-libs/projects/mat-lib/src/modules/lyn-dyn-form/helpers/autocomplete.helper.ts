import { IAutocompleteModel, IAutocompleteOptionModel, INPUT_ENUMS, INPUT_TYPES } from '../models';

import { ControlBase } from '.';

export class AutocompleteDropdownControl extends ControlBase {
  controlType: INPUT_TYPES = INPUT_ENUMS.AUTOCOMPLETE;
  /**
   * Options for a form field dropdown selection
   */
  options: IAutocompleteOptionModel[];
  /**
   * Turns single dropdown to multiple selector
   */
  multiple?: boolean;
  /**
   * Form field output/input value
   */
  value: string | null;
  constructor(options: IAutocompleteModel) {
    super(options);
    this.controlType = options.controlType || this.controlType;
    this.label = options.label || 'Select option';
    this.multiple = options.multiple || false;
    this.options = options.options || [];
    this.value = options.value || null;
  }
}
