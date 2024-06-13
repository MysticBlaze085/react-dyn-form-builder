import { IControlBaseModel } from './code-base.model';
import { INPUT_TYPES } from './input.type';

export interface ICheckboxInputModel extends IControlBaseModel {
  /**
   * Field input type
   */
  controlType?: INPUT_TYPES;
  /**
   * Checkbox control value
   */
  value?: boolean;
}
