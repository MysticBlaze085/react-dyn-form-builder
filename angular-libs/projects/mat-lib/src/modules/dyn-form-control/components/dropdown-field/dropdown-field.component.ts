import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DropdownFieldControlEnums, DropdownFieldControlModel, DropdownOptionModel } from './api';
import { IconEventEnums, TextIconEnums } from '@core/shared/modules/lyn-insight-icon/models';
import { Observable, map, startWith } from 'rxjs';
import { isArray, isEqual } from 'lodash';

import { FieldComponent } from '../field/field.component';
import { FieldTypes } from '../field/api';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { NgStyle } from '@angular/common';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'lyn-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownFieldComponent extends FieldComponent implements OnChanges, AfterViewInit, OnDestroy {
  /**
   * Allows for all selected dropdown to interact when user selects all or an individually value
   */
  @ViewChild('allSelected') public allSelected!: MatOption;
  /**
   * Change width of form field
   */
  @Input() public width: string = '200px';
  /**
   * ngStyling allows override of style
   */
  @Input() public fieldStyle!: NgStyle;
  /**
   * FieldControl control and display configuration
   */
  @Input() public fieldControl!: DropdownFieldControlModel<string | string[]>;
  /**
   * Existing value of field control
   */
  @Input() public formValue!: string | string[];
  /**
   * Value changes emits to parent
   */
  @Output() public valueChanges: EventEmitter<{ [key: string]: FieldTypes }> = new EventEmitter<{ [key: string]: FieldTypes }>();
  /**
   * Allows autocomplete filtering event listener to through dropdown option values
   */
  public filteredOptions$!: Observable<DropdownOptionModel[]>;
  /**
   * Dropdown template display controls
   */
  public formControl!: { [key: string]: UntypedFormControl };
  public dropboxFieldControlEnums = DropdownFieldControlEnums;
  public iconTypeEnum = TextIconEnums;
  public iconEventType = IconEventEnums;
  /**
   * Hides password input value and icon change
   */
  public isHiddenPassword = true;

  constructor() {
    super();
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      this.initialize(this.fieldControl, this.formValue);
    }, 1000);
  }
  public ngOnChanges({ fieldControl, formValue }: SimpleChanges): void {
    super.ngOnChanges({ fieldControl, formValue });
  }
  public ngOnDestroy() {
    super.ngOnDestroy();
  }
  /**
   * Initializes from group values
   */
  private initialize(fieldControl: DropdownFieldControlModel<string | string[]>, formValue: string | string[]) {
    switch (fieldControl.controlType) {
      case this.dropboxFieldControlEnums.MultiDropdown: {
        if (formValue.length && fieldControl.options.length) {
          this.formControl[fieldControl.controlName].patchValue([...fieldControl.options.map((item: any) => item.value), '1']);
        }
        break;
      }
      case this.dropboxFieldControlEnums.Autocomplete: {
        this.filteredOptions$ = this.formControl[fieldControl.controlName].valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value.key)),
          map((key) => this._filter(fieldControl, key))
        );
        break;
      }
      case this.dropboxFieldControlEnums.DefaultDropdown: {
        if (typeof formValue == 'string' && !fieldControl.isMultiple) {
          const selectValue = fieldControl.options.find(
            (option) => !formValue.includes('null') && !option.isOptionGroup && option.value && option.value.includes(formValue)
          );
          const value = !selectValue?.isOptionGroup && selectValue?.value ? selectValue?.value : null;
          this.formControl[fieldControl.controlName].patchValue(value);
        }
        break;
      }
      default: {
        break;
      }
    }
  }
  /**
   * Displays key to dom
   */
  public displayFn(value: { key: string; value: string }) {
    return value ? value.key : undefined;
  }
  /**
   * Outputs selected autocomplete value
   */
  public acValueChanges(e: MatAutocompleteSelectedEvent) {
    const value = e.option.value;
    this.valueChanges.emit({ [this.fieldControl.controlName]: value['value'] });
  }
  /**
   * Filters values options and displays matched key value
   */
  private _filter(fieldControl: DropdownFieldControlModel<string | string[]>, value: string): DropdownOptionModel[] {
    const filterValue = value.toLowerCase();
    const options: DropdownOptionModel[] = fieldControl.options;
    return options.filter((option) =>
      !option.isOptionGroup
        ? option.key.toLowerCase().includes(filterValue)
        : option.options.filter((nestedOption) => nestedOption.key.toLowerCase().includes(filterValue))
    );
  }
  /**
   * Maps dropdown group options output value
   */
  public onDropdownOptionGroupChanges(controlName: string, options: any[], changedValue: string | string[]) {
    const changedDropdownValue: any = [];
    options.forEach((optionGroup) => {
      optionGroup.options.forEach((option: any) => {
        if (isArray(changedValue)) {
          changedValue.forEach((value) => {
            if (option.value === value) {
              changedDropdownValue.push({ [optionGroup.optgroupLabel]: option.value });
            }
          });
        } else {
          if (option.value === changedValue) {
            changedDropdownValue.push({ [optionGroup.optgroupLabel.toLowerCase()]: option.value });
          }
        }
      });
    });
    this.valueChanges.emit({ [controlName]: changedDropdownValue[0] });
  }
  /**
   * Maps dropdown options output value
   */
  public selectAll(ev: any) {
    if (ev._selected) {
      this.formControl[this.fieldControl.controlName].setValue(this.fieldControl.options.map((opt: any) => opt['value']) ?? []);
      ev._selected = true;
    }
    if (!ev._selected) {
      this.formControl[this.fieldControl.controlName].setValue([]);
    }
  }
  /**
   * Toggles Select All Options
   */
  public toggleAllSelection() {
    if (this.allSelected.selected && this.fieldControl?.options) {
      this.formControl[this.fieldControl.controlName].patchValue([...this.fieldControl.options.map((item: any) => item.value), 'all']);
    } else {
      this.formControl[this.fieldControl.controlName].patchValue([]);
    }
  }
  /**
   * Removes all selected option from form value if not all options are selected on click event
   */
  public otherOptionSelected() {
    const mapOptions = this.fieldControl.options ? [...this.fieldControl.options.map((item: any) => item.value), 'all'] : [];
    const formControl = this.formControl[this.fieldControl.controlName].value;
    if (!isEqual(mapOptions, formControl) && this.fieldControl.isSelectAllOptions) {
      this.formControl[this.fieldControl.controlName].patchValue([
        ...this.formControl[this.fieldControl.controlName].value.filter((item: string) => item !== 'all'),
      ]);
    }
    if (isEqual([...formControl.map((item: string) => item), 'all'], mapOptions) && this.fieldControl.isSelectAllOptions) {
      this.formControl[this.fieldControl.controlName].patchValue(mapOptions);
    }
  }
}
