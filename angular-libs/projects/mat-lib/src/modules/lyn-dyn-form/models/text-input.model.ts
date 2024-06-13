import { IControlBaseModel, INPUT_TYPES } from '.';

export interface ITextInputModel extends IControlBaseModel {
  /**
   * Field input type
   */
  controlType?: INPUT_TYPES;
  /**
   * Text value
   */
  value?: string | any[] | any;
}
