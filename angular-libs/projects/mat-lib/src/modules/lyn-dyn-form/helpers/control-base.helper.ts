import { InsightColorTypes, InsightIconTypes } from '@core/shared/modules/lyn-insight-icon/models';

import { IControlBaseModel } from '../models/code-base.model';
import { TextInsightIconModel } from '../models';

/**
 * Class helper that builds out a form field configuration.
 * @FormInputControlBase
 */
export class ControlBase {
  /**
   * Input Button configuration
   */
  public button?: { color: InsightColorTypes; icon: InsightIconTypes; text: string };
  /**
   * Class allows for scss overrides
   */
  public class?: string;
  /**
   * Form field controlName
   */
  public controlName: string;
  /**
   * Attribute for cypress
   */
  public dataCy?: any;
  /**
   * Disables a form field
   */
  public disabled?: boolean = false;
  /**
   * Error message to be displayed if field has a validation error
   */
  public errorMessage?: string;
  /**
   * Form field groups
   */
  public group?: string;
  /**
   * Hidden value allows a form field to be displayed or not
   */
  public hidden?: boolean = false;
  /**
   * Form Field hint
   */
  public hint?: string;
  /**
   * Icon within an input
   */
  public icon?: TextInsightIconModel;
  /**
   * Information provides a description of what the form field represents
   */
  public info?: string | { [key: string]: any }[];
  /**
   * Form field label
   */
  public label?: string;
  /**
   * Sort order which form field should displayed
   */
  public order?: number;
  /**
   * Form field placeholder
   */
  public placeholder?: string;
  /**
   * Sets if form field is required
   */
  public required: boolean;
  /**
   * Selected All Multiple Value
   */
  public selectAllValue?: string;
  /**
   * Nested form field groups
   */
  public subGroup?: string;
  /**
   * Configurations dependant on another and interact with each other
   */
  public subConfig?: IControlBaseModel[];
  /**
   * Sets reactive form Validators
   */
  public validators?: any[];
  /**
   * Input value
   */
  public value?: any;
  /**
   * @param  {IControlBaseModel<T>} options
   * @returns options
   */
  constructor(options: IControlBaseModel) {
    this.button = options.button;
    this.class = options.class || '';
    this.controlName = options.controlName || '';
    this.dataCy = options.dataCy || options.label;
    this.disabled = options.disabled || this.disabled;
    this.errorMessage = options.errorMessage || 'Field value is required.';
    this.group = options.group;
    this.hidden = options.hidden || this.hidden;
    this.hint = options.hint;
    this.info = options.info;
    this.label = options.label || '';
    this.order = options.order === undefined ? 1 : options.order;
    this.placeholder = options.placeholder || '';
    this.required = !!options.required;
    this.subGroup = options.subGroup;
    this.validators = options.validators || [];
    this.value = options.value || '';
    this.selectAllValue = options.selectAllValue || 'Select All';
  }
}
