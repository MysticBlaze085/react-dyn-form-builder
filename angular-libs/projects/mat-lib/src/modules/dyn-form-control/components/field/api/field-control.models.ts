import { FieldAppearanceType, FieldControlTypes, FieldTypes } from './field-control.types';
import { FormControlOptions, ValidatorFn } from '@angular/forms';

import { NgStyle } from '@angular/common';
import { TextInsightIconModel } from '@core/shared/modules/lyn-insight-icon/models';

export interface FieldControlModel<T = FieldTypes> {
  [x: string]: any;
  appearance?: FieldAppearanceType;
  class?: string;
  controlType: FieldControlTypes;
  controlName: string;
  buttonText?: string;
  dataCy?: any;
  disabled?: boolean;
  errorMessage?: string;
  fieldStyle?: NgStyle;
  group?: string;
  hidden?: boolean;
  hint?: string;
  icon?: TextInsightIconModel;
  info?: string | { [key: string]: string }[];
  isSuffix?: boolean;
  label?: string;
  order?: number;
  placeholder?: string;
  required: boolean;
  suffixValue?: string;
  textareaMinRows?: number;
  textareaMaxRows?: number;
  updateTo?: string;
  validators: ValidatorFn | ValidatorFn[] | FormControlOptions | null;
  value: T;
}
