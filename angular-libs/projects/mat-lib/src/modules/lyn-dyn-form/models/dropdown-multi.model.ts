import { FeatureFlagTypes } from '@core/modules/feature-flags-v1/api';
import { IControlBaseModel } from './code-base.model';
import { INPUT_TYPES } from './input.type';

/**
 * Form field dropdown option key/value pair
 */
export interface IDropdownOptionMultiModel {
  /**
   * Attribute for cypress
   */
  dataCy?: any;
  /**
   * Disable a selected value
   */
  disabled?: boolean;
  /**
   * Can be controlled by feature flag service
   */
  featureFlag?: { module: FeatureFlagTypes; nestedFeature: FeatureFlagTypes };
  /**
   * Key of a form field that is displayed in dropdown menu
   */
  key: string;
  /**
   * Hides an option
   */
  hidden?: boolean;
  /**
   * Selected option
   */
  selected?: boolean;
  /**
   * Value of a form field
   */
  value: string | null;
}

export interface IDropdownMultiModel extends IControlBaseModel {
  /**
   * Field input type
   */
  controlType?: INPUT_TYPES;
  /**
   * Display Selection All Option control
   */
  displaySelectAllOption: boolean;
  /**
   * Displays selected dropdown value
   */
  isSelected?: boolean;
  /**
   * Truthy turns on multi selection and false only allows one selection
   */
  multiple?: boolean;
  /**
   * Options in a dropdown group
   */
  options: IDropdownOptionMultiModel[];
  /**
   * Dropdown default selected value/values
   */
  value?: (string | null)[] | null;
  /**
   * Selected All Multiple Value
   */
  selectAllValue?: string;
}
