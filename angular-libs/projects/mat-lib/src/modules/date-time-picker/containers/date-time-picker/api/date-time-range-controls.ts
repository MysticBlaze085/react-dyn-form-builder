import { DropdownFieldControlEnums, DropdownFieldHelper } from '@core/shared/modules/dyn-form-control/components/dropdown-field/api';

import { DateTimeDurationEnums } from './date-time-range-stepper.models';
import { FieldControlModel } from '@core/shared/modules/dyn-form-control/components/field/api';
import { Validators } from '@angular/forms';

export const DateTimeRangeControls: FieldControlModel = new DropdownFieldHelper({
  controlType: DropdownFieldControlEnums.DefaultDropdown,
  controlName: 'duration',
  isMultiple: false,
  label: 'Duration',
  placeholder: 'Duration',
  required: true,
  options: [
    { isOptionGroup: false, value: 'custom', key: 'Custom Date Range', dataCy: 'custom-date-opt' },
    { isOptionGroup: false, value: DateTimeDurationEnums.Month, key: '30 Days (Now - 30 days)', dataCy: 'month-date-opt' },
    { isOptionGroup: false, value: DateTimeDurationEnums.Week, key: '7 Days (Now - 7 days)', dataCy: 'week-date-opt' },
    { isOptionGroup: false, value: DateTimeDurationEnums.Day, key: '24 Hours (Now - 24 hours)', dataCy: 'day-date-opt' },
    { isOptionGroup: false, value: DateTimeDurationEnums.Hour, key: 'One Hour (Now - 1 hour)', dataCy: 'hour-date-opt' },
  ],
  validators: [Validators.required],
  dataCy: 'date-time-rage-duration',
  value: 'custom',
});
