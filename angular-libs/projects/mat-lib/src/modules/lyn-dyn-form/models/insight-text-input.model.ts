import { IControlBaseModel, INPUT_TYPES } from '.';
import { InsightColorTypes, InsightIconTypes } from '@core/shared/modules/lyn-insight-icon/models';

export interface IInsightTextInputModel extends IControlBaseModel {
  /**
   * Field input type
   */
  controlType?: INPUT_TYPES;
  /**
   * Text value
   */
  value?: string;
  /**
   * Icon Insight indicates status of input validation
   */
  icon: TextInsightIconModel;
}

export enum TEXT_ICON_ENUM {
  PRE = 'PRE',
  SUFFIX = 'SUFFIX',
}

export type TEXT_ICON_TYPE = TEXT_ICON_ENUM.PRE | TEXT_ICON_ENUM.SUFFIX;

export enum ICON_EVENT_ENUM {
  EDIT = 'EDIT',
  CANCEL = 'CANCEL',
  UNDEFINED = 'UNDEFINED',
  WARNING = 'WARNING',
  INFO = 'INFORMATION',
}

export type ICON_EVENT_TYPE =
  | ICON_EVENT_ENUM.CANCEL
  | ICON_EVENT_ENUM.EDIT
  | ICON_EVENT_ENUM.UNDEFINED
  | ICON_EVENT_ENUM.INFO
  | ICON_EVENT_ENUM.WARNING;
export interface TextInsightIconModel {
  type: TEXT_ICON_TYPE;
  class?: string;
  color?: InsightColorTypes;
  icon?: InsightIconTypes;
  text?: string;
  eventType?: ICON_EVENT_TYPE;
}
