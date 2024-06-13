import { FieldControlHelper, FieldTypes } from '../../field/api';
import { RadioFieldControlModel, RadioOptionModel } from './radio-field.model';

export class RadioFieldHelper extends FieldControlHelper<FieldTypes> {
  /**
   * Radio button control value
   */
  value: FieldTypes;
  /**
   * Radio group option list
   */
  options: RadioOptionModel[];
  /**
   * Direction list gets displayed
   */
  fxLayout: 'row' | 'column';
  /**
   * How option list are displayed
   */
  fxLayoutAlign: 'start' | 'center' | 'space-around' | 'space-between' | 'space-evenly';

  constructor(options: RadioFieldControlModel) {
    super(options);
    this.value = options.value ?? null;
    this.options = options.options ?? [{ key: 'key1', value: 'key1', hidden: false }];
    this.fxLayout = options.fxLayout ?? 'row';
    this.fxLayoutAlign = options.fxLayoutAlign ?? 'start';
  }
}
