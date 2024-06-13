import { IControlBaseModel, INPUT_TYPES } from '.';

/**
 * Outputs Integer input type
 */
export interface IIntegerInputModel extends IControlBaseModel {
  /**
   * Field input type
   */
  controlType?: INPUT_TYPES;
  /**
   * Integer input value
   */
  value?: number;
}
