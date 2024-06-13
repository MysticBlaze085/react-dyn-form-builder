import { IControlBaseModel } from './code-base.model';
import { INPUT_TYPES } from './input.type';

export interface ISliderInputModel extends IControlBaseModel {
  /**
   * Field input type
   */
  controlType?: INPUT_TYPES;
  /**
   * Slider control value
   */
  value?: boolean;
}
