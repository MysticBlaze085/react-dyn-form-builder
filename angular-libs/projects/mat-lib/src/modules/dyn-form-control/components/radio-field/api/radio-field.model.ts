import { FieldControlModel, FieldTypes } from '../../field/api';

export interface RadioOptionModel {
  /**
   * Cypress data cy tag
   */
  dataCy: string;
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
  value: FieldTypes;
}

export interface RadioFieldControlModel extends FieldControlModel<FieldTypes> {
  options: RadioOptionModel[];
  fxLayout?: 'row' | 'column';
  fxLayoutAlign?: 'start' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
}
