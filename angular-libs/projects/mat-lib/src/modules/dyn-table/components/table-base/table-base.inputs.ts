import {
  DropdownFieldControlEnums,
  DropdownFieldControlModel,
  DropdownFieldHelper,
} from '@core/shared/modules/dyn-form-control/components/dropdown-field/api';
import { FieldControlEnums, FieldControlHelper, FieldControlModel } from '@core/shared/modules/dyn-form-control/components/field/api';
import { IconEventEnums, InsightColorEnums, InsightIconEnums, TextIconEnums } from '@core/shared/modules/lyn-insight-icon/models';

export const TableBaseFilterInputs: (filterByColumn: string, disabled: boolean) => FieldControlModel = (
  filterByColumn: string,
  disabled: boolean
) => {
  return new FieldControlHelper<string>({
    controlType: FieldControlEnums.InsightText,
    controlName: 'filter',
    label: `Filter by  ${filterByColumn === 'Gateway' ? 'API Proxy' : filterByColumn}`,
    placeholder: `Filter by ${filterByColumn === 'Gateway' ? 'API Proxy' : filterByColumn}`,
    icon: {
      type: TextIconEnums.SUFFIX,
      color: InsightColorEnums.DEFAULT,
      icon: InsightIconEnums.CANCEL,
      text: 'Clear Filter',
      eventType: IconEventEnums.CANCEL,
    },
    value: '',
    disabled,
    dataCy: `filter-by-${filterByColumn === 'gateway' ? 'apiproxy' : filterByColumn.toLowerCase()}`,
    validators: [],
    required: false,
  });
};

export const TableColumnFilterInput: (
  filterByColumn: string,
  columnData: string[],
  disabled: boolean
) => DropdownFieldControlModel | FieldControlModel = (filterByColumn: string, columnData: string[], disabled: boolean) => {
  const options = columnData.map((str: string) => {
    return {
      key: str,
      value: str,
      isOptionGroup: false,
      dataCy: str,
    };
  }) as any;

  return new DropdownFieldHelper({
    controlType: DropdownFieldControlEnums.DefaultDropdown,
    controlName: `${filterByColumn}Filter`,
    isMultiple: false,
    label: 'Multi-Dropdown',
    placeholder: 'Multi-Dropdown',
    required: false,
    validators: [],
    value: '',
    disabled,
    options,
    dataCy: 'column-filter',
  });
};
