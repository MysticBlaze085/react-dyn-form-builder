import { FieldAppearanceType, FieldControlTypes, FieldTypes } from './field-control.types';
import { FormControlOptions, ValidatorFn } from '@angular/forms';

import { FieldAppearanceEnums } from './field-control.enums';
import { FieldControlModel } from './field-control.models';
import { NgStyle } from '@angular/common';
import { TextInsightIconModel } from '@core/shared/modules/lyn-insight-icon/models';

/**
 * Class helper that builds out a form field configuration.
 * @InputControlHelper
 */
export class FieldControlHelper<T = FieldTypes> {
  /**
   * Selects Material Appearance
   */
  public appearance?: FieldAppearanceType;
  /**
   * Class allows for scss overrides
   */
  public class?: string;
  /**
   * Form field controlName
   */
  public controlName: string;
  /**
   * Field type
   */
  public controlType: FieldControlTypes;
  /**
   * Passes text value to button
   */
  public buttonText?: string;
  /**
   * Attribute for cypress
   */
  public dataCy?: any;
  /**
   * Disables a form field
   */
  public disabled?: boolean = false;
  /**
   * Field styles allows for input design overrides
   */
  public fieldStyle?: NgStyle;
  /**
   * Error message to be displayed if field has a validation error
   */
  public errorMessage?: string;
  /**
   * Group allows for form fields to be grouped together
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
   * Insight Icon
   */
  public icon?: TextInsightIconModel;
  /**
   * Information provides a description of what the form field represents
   */
  public info?: string | { [key: string]: any }[];
  /**
   * Allows for a string suffix value to display
   */
  public isSuffix?: boolean;
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
   * Suffix string value
   */
  public suffixValue?: string;
  /**
   * Textarea size controls
   */
  public textareaMinRows?: number;
  public textareaMaxRows?: number;
  /**
   * Update a value if is a number
   */
  public updateTo?: string;
  /**
   * Sets reactive form Validators
   */
  public validators: ValidatorFn | ValidatorFn[] | FormControlOptions | null;
  /**
   * Input value
   */
  public value: FieldTypes | T;
  /**
   * @param  {FieldControlModel} options
   * @returns options
   */
  constructor(options: FieldControlModel<FieldTypes | T>) {
    this.appearance = options.appearance ?? FieldAppearanceEnums.outline;
    this.class = options.class ?? '';
    this.controlName = options.controlName ?? '';
    this.controlType = options.controlType;
    this.buttonText = options.buttonText ?? '';
    this.dataCy = options.dataCy ?? options.label;
    this.fieldStyle = options.fieldStyle;
    this.disabled = options.disabled ?? this.disabled;
    this.errorMessage = options.errorMessage ?? 'Field value is required.';
    this.group = options.group;
    this.hidden = options.hidden ?? this.hidden;
    this.hint = options.hint;
    this.icon = options.icon;
    this.info = options.info;
    this.isSuffix = options.isSuffix ?? false;
    this.label = options.label ?? '';
    this.order = options.order ?? 1;
    this.placeholder = options.placeholder ?? '';
    this.required = !!options.required;
    this.validators = options.validators ?? [];
    this.value = options.value || options.value === 0 || options.value === false ? options.value : null;
    this.suffixValue = options.suffixValue ?? '';
    this.textareaMinRows = options.textareaMinRows ?? 1;
    this.textareaMaxRows = options.textareaMaxRows ?? 10;
    this.updateTo = options.updateTo;
  }
}
