import { DropdownFieldControlEnums } from './dropdown-field-control.enums';

export type DropdownFieldControlTypes =
  | DropdownFieldControlEnums.Autocomplete
  | DropdownFieldControlEnums.DefaultDropdown
  | DropdownFieldControlEnums.DropdownOptionGroups
  | DropdownFieldControlEnums.MultiDropdown;
