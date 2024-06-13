import { IControlBaseModel } from './code-base.model';
import { INPUT_TYPES } from './input.type';

export interface IDateInputModel extends IControlBaseModel {
  /**
   * Field input type
   */
  controlType?: INPUT_TYPES;
  /**
   * Date value
   */
  value?: Date;
}
