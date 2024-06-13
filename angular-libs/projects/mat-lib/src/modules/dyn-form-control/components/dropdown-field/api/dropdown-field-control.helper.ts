import { DropdownFieldControlModel, DropdownOptionModel } from './dropdown-field-control.model';
import { FieldControlHelper, FieldControlTypes } from '../../field/api';

import { DropdownFieldControlEnums } from './dropdown-field-control.enums';

export class DropdownFieldHelper extends FieldControlHelper<string | string[] | null> {
  /**
   * Truthy turns on multi selection and false only allows one selection
   */
  isMultiple?: boolean;
  /**
   * Allows UX interaction for select all option
   */
  isSelectAllOptions?: boolean;
  /**
   * Displays selection all value option name
   */
  selectAllDisplay?: string;
  /**
   * Options in a dropdown group
   */
  options: DropdownOptionModel[];
  /**
   * Selected All Multiple Value
   */
  selectAllValue?: string;

  constructor(options: DropdownFieldControlModel) {
    super(options);
    this.controlType = options.controlType;
    this.isMultiple = options.isMultiple ?? false;
    if (options.isMultiple) {
      this.isSelectAllOptions = options.isSelectAllOptions ?? false;
      this.selectAllDisplay = 'Select All';
    }
    this.value = options.value ?? null;
    this.options = options.options ?? this.setDefaults(this.controlType);
  }
  /**
   * Sets default example
   * @param type
   * @returns
   */
  private setDefaults(type: FieldControlTypes): DropdownOptionModel[] {
    if (type === DropdownFieldControlEnums.DropdownOptionGroups) {
      return [{ isOptionGroup: true, optgroupLabel: 'Group', options: [{ key: 'key1', value: 'key1', dataCy: 'default-key-value-pair' }] }];
    } else {
      return [{ isOptionGroup: false, key: 'key1', value: 'key1', dataCy: 'default-key-value-pair' }];
    }
  }
}
