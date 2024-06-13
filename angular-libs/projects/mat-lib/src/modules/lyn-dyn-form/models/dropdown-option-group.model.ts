import { FeatureFlagTypes } from '@core/modules/feature-flags-v1/api';
import { IControlBaseModel } from './code-base.model';
import { INPUT_TYPES } from './input.type';

/**
 * Form field dropdown option key/value pair
 */ export interface IGroupOptionModel<T> {
  /**
   * Attribute for cypress
   */
  dataCy?: string;
  /**
   * Disable a selected value
   */
  disabled?: boolean;
  /**
   * Can be controlled by feature flag service
   */
  featureFlag?: { module: FeatureFlagTypes; nestedFeature: FeatureFlagTypes };
  /**
   * Hidden hides an option from being displayed
   */
  hidden?: boolean;
  /**
   * Key of a form field that is displayed in dropdown menu
   */
  key: string;
  /**
   * Group label value
   */
  label: string;
  /**
   * Value of a form field
   */
  value: T;
}

export interface IDropdownOptionGroup<T> {
  /**
   * Option group label
   */
  optgroupLabel: string;
  /**
   * Options of option group
   */
  options: IGroupOptionModel<T>[];
}

export interface IDropdownOptionGroupModel<T> extends IControlBaseModel {
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
  options: IDropdownOptionGroup<T>[];
  /**
   * Dropdown group selected value/values
   */
  value?: T;
  dataCy?: string;
}
