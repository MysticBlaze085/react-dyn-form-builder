import { InsightColorTypes, InsightIconTypes } from '@core/shared/modules/lyn-insight-icon/models';

import { IControlBaseModel } from './code-base.model';
import { INPUT_TYPES } from './input.type';

export interface ISelectionListModel extends IControlBaseModel {
  /**
   * Field input type
   */
  controlType?: INPUT_TYPES;
  /**
   * Add input control name value
   */
  addControlName: string;
  /**
   * Add input control type input
   */
  addControlType?: INPUT_TYPES;
  /**
   * Add input label
   */
  addInputLabel?: string;
  /**
   * Add input validation
   */
  addInputValidation?: any[];
  /**
   * Add button display configuration
   */
  addInputButton?: { color: InsightColorTypes; icon: InsightIconTypes; text: string };
  /**
   * Remove button display configuration
   */
  removeInputButton?: { color: InsightColorTypes; icon: InsightIconTypes; text: string };
  /**
   * Add input value
   */
  addValue?: string;
  /**
   * Selection list value
   */
  value?: { [key: string]: string }[];
}
