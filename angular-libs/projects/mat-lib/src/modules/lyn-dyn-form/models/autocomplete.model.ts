import { IControlBaseModel } from './code-base.model';
import { INPUT_TYPES } from './input.type';

/**
 * Form field dropdown option key/value pair
 */
export interface IAutocompleteOptionModel {
  /**
   * Key of a form field that is displayed in dropdown menu
   */
  key: string;
  /**
   * Value of a form field
   */
  value: string | string[];
  /**
   * Disable a selected value
   */
  disabled?: boolean;
}

export interface IAutocompleteModel extends IControlBaseModel {
  /**
   * Field input type
   */
  controlType?: INPUT_TYPES;
  /**
   * Truthy turns on multi selection and false only allows one selection
   */
  multiple?: boolean;
  /**
   * Options in a dropdown group
   */
  options: IAutocompleteOptionModel[];
  /**
   * Dropdown default selected value/values
   */
  value?: string | null;
}
