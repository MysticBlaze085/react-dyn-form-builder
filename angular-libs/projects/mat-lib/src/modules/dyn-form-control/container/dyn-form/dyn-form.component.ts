import { Component, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FieldControlModel, FieldTypes } from '../../components/field/api';

import { DropdownFieldHelper } from '../../components/dropdown-field/api';
import { FieldComponent } from '../../components';
import { RadioFieldHelper } from '../../components/radio-field/api';

@Component({
  selector: 'lyn-dyn-form',
  templateUrl: './dyn-form.component.html',
})
export class DynFormComponent extends FieldComponent implements OnChanges, OnDestroy {
  constructor() {
    super();
  }

  public ngOnChanges({ fieldControl, formValue, valueToDisplay, customDisplayValue }: SimpleChanges) {
    super.ngOnChanges({ fieldControl, formValue, valueToDisplay, customDisplayValue });
  }

  public ngOnDestroy() {
    super.ngOnDestroy();
  }

  public fieldType(control: FieldControlModel): string {
    if (control instanceof DropdownFieldHelper) return 'dropdown';
    if (control instanceof RadioFieldHelper) return 'radio';
    if (control.controlType === 'file') return this.fieldControlEnums.File;
    return 'field';
  }

  public chValueChanges(changedValue: { [key: string]: FieldTypes }) {
    this.valueChanges.emit(changedValue);
  }
}
