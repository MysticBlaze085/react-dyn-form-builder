import { IControlBaseModel } from './code-base.model';
import { INPUT_TYPES } from './input.type';

export interface IRadioOptionModel {
  /**
   * Disable a selected value
   */
  disabled?: boolean;
  /**
   * Hidden hides an option from being displayed
   */
  hidden?: boolean;
  /**
   * Key of a form field that is displayed in dropdown menu
   */
  key: string;
  /**
   * Value of a form field
   */
  value: any;
  /**
   * Data cy tags
   */
  dataCy?: string;
}

export interface IRadioButtonGroupInputModel extends IControlBaseModel {
  /**
   * Field input type
   */
  controlType?: INPUT_TYPES;
  /**
   * Options
   */
  options?: IRadioOptionModel[];
  /**
   * Checkbox control value
   */
  value?: any;
}
