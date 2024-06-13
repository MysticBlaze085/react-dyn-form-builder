import { IControlBaseModel, INPUT_TYPES } from '.';

export interface ITextareaInput extends IControlBaseModel {
  /**
   * Field input type
   */
  controlType?: INPUT_TYPES;
  /**
   * Textarea value
   */
  value?: string;
}
