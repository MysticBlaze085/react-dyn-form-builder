import { FieldAppearanceEnums, FieldControlEnums } from './field-control.enums';

import { DropdownFieldControlTypes } from '../../dropdown-field/api';
import { Guid } from 'guid-typescript';
import { Moment } from 'moment';

export type FieldTypes = string | string[] | number | number[] | Guid | boolean | null | Moment;

export type FieldControlTypes =
  | FieldControlEnums.CheckBox
  | FieldControlEnums.CustomDisplay
  | FieldControlEnums.File
  | FieldControlEnums.Text
  | FieldControlEnums.InsightText
  | FieldControlEnums.Int
  | FieldControlEnums.Password
  | FieldControlEnums.RadioGroup
  | FieldControlEnums.Slider
  | FieldControlEnums.Textarea
  | DropdownFieldControlTypes;

export type FieldAppearanceType =
  | FieldAppearanceEnums.fill
  | FieldAppearanceEnums.legacy
  | FieldAppearanceEnums.outline
  | FieldAppearanceEnums.standard;
