import { IDropdownOptionGroup, INPUT_TYPES, TextInsightIconModel } from '.';
import { InsightColorTypes, InsightIconTypes } from '@core/shared/modules/lyn-insight-icon/models';

import { IDropdownOptionModel } from './dropdown-default.model';

/**
 * Form field Configuration Information
 */
export interface IControlBaseModel {
  /**
   * Input Button configuration
   */
  button?: { color: InsightColorTypes; icon: InsightIconTypes; text: string };
  /**
   * Text displayed within button
   */
  buttonText?: string;
  /**
   * Class allows for scss overrides
   */
  class?: string;
  /**
   * Form field controlName
   */
  controlName: string;
  /**
   * Field input type
   */
  controlType?: INPUT_TYPES;
  /**
   * Error message to be displayed if field has a validation error
   */
  errorMessage?: string;
  /**
   * Display Selection All Option control
   */
  displaySelectAllOption?: boolean;
  /**
   * Disables a form control within a form group
   */
  disabled?: boolean;
  /**
   * Form field groups
   */
  group?: string;
  /**
   * Hidden controls wether input is displayed
   */
  hidden?: boolean;
  /**
   * Form Field hint
   */
  hint?: string;
  /**
   * Displays selected dropdown value
   */
  isSelected?: boolean;
  /**
   * Icon displays within an input
   */
  icon?: TextInsightIconModel;
  /**
   * Information provides a description of what the form field represents
   */
  info?: string | { [key: string]: any }[];
  /**
   * Form field label
   */
  label?: string;
  /**
   * Multiple selection dropdown
   */
  multiple?: boolean;
  /**
   * Field select options
   */
  options?: IDropdownOptionModel<unknown>[] | IDropdownOptionGroup<unknown>[];
  /**
   * Sort order which form field should displayed
   */
  order?: number;
  /**
   * Form field placeholder
   */
  placeholder?: string;
  /**
   * Sets if form field is required
   */
  required?: boolean;
  /**
   * Selected All Multiple Value
   */
  selectAllValue?: string;
  /**
   * Nested form field groups
   */
  subGroup?: string;
  /**
   * Updates on event emitter
   */
  updateOn?: 'change' | 'blur' | 'submit';
  /**
   * Sets reactive form Validators
   */
  validators?: any[];
  /**
   * Field input value
   */
  value?: any | any[] | null;
  /**
   * Optional data attribute for cypress
   */
  dataCy?: string;
}
