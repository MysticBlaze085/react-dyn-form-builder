import { IControlBaseModel } from './code-base.model';
import { INPUT_TYPES } from './input.type';

export interface ICopyLinkInput extends IControlBaseModel {
  /**
   * Field input type
   */
  controlType?: INPUT_TYPES;
  /**
   * Textarea value
   */
  value?: string;
}
