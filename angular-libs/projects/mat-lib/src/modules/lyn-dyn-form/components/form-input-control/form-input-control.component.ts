import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import {
  DATE_INPUT_ENUMS,
  IAutocompleteOptionModel,
  ICON_EVENT_ENUM,
  IControlBaseModel,
  IDropdownOptionGroup,
  INPUT_APPEARANCE_ENUMS,
  INPUT_APPEARANCE_TYPES,
  INPUT_ENUMS,
  TEXT_ICON_ENUM,
} from '@core/shared/modules/lyn-dyn-form/models';
import { Observable, of } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { clone, differenceWith, isEqual } from 'lodash';
import { map, startWith } from 'rxjs/operators';

import { DynFormInputErrorStateMatcher } from '@core/shared/modules/lyn-dyn-form/utils';
import { MatOption } from '@angular/material/core';

/**
 * Form field input templates
 * @FormInputControlComponent
 */
@Component({
  selector: 'lyn-form-input-control',
  templateUrl: './form-input-control.component.html',
  styleUrls: ['./form-input-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputControlComponent implements OnChanges {
  /**
   * Reactive form field control configuration
   */
  @Input() public inputControl!: IControlBaseModel;
  /**
   * Input width
   */
  @Input() public width = '100%';
  /**
   * Input value
   */
  @Input() public formValue: any = '';
  /**
   * Sets field input appearance
   */
  @Input() public inputAppearance: INPUT_APPEARANCE_TYPES = INPUT_APPEARANCE_ENUMS.OUTLINE;
  /**
   * Control to filter out selected options
   */
  @Input() public filterOptionControl!: string;
  /**
   * Selected autocomplete options
   */
  @Input() public selectedOptions: string[] = [''];
  /**
   * Outputs form field control value on a triggered change event
   */
  @Output() public formControlChanges = new EventEmitter();
  /**
   * Outputs error if true or false
   */
  @Output() public isValid: EventEmitter<boolean> = new EventEmitter();
  /**
   * Outputs addItem value
   */
  @Output() public addItem = new EventEmitter();
  /**
   * Outputs removeItem value
   */
  @Output() public removeItem = new EventEmitter();

  @ViewChild('allSelected') private allSelected!: MatOption;

  /**
   * Field input types
   */
  public inputTypeEnum = INPUT_ENUMS;
  /**
   * Field icon types
   */
  public inputIconTypeEnum = TEXT_ICON_ENUM;
  /**
   * Icon Event Triggers
   */
  public iconEventType = ICON_EVENT_ENUM;
  /**
   * Date field input types
   */
  public datepickerTypeEnum = DATE_INPUT_ENUMS;
  /**
   * Error when invalid select dropdown control is dirty, touched, or submitted.
   */
  public matcher = new DynFormInputErrorStateMatcher();
  /**
   * Form group container for a field input control
   */
  public form!: UntypedFormGroup;
  /**
   * Hides password input value and icon change
   */
  public isHiddenPassword = true;
  /**
   * Toggles the color of copy link button
   */
  public toggleColor = true;

  constructor(private readonly fb: UntypedFormBuilder) {}
  /**
   * Get form group controls
   */
  get formControl() {
    return this.form.controls;
  }
  /**
   * backup initial option array
   */
  private backupOptions: IAutocompleteOptionModel[] = [];
  /**
   * Filtered options observable
   */
  public filteredOptions$: Observable<any[]> | undefined = of([]);
  /**
   * Sets reactive form group if not undefined
   */
  public ngOnChanges({ inputControl, formValue, filterOptionControl, selectedOptions }: SimpleChanges) {
    if (inputControl?.currentValue) this.initializeFormGroup(inputControl.currentValue);
    if (formValue?.currentValue) this.formValue = formValue.currentValue;
    if (filterOptionControl?.currentValue) this.filterOptionControl = filterOptionControl.currentValue;
    if (selectedOptions?.currentValue) this.selectedOptions = selectedOptions.currentValue;
  }
  /**
   * Toggles Select All Options
   */
  public toggleAllSelection() {
    if (this.allSelected.selected && this.inputControl?.options) {
      this.form.controls[this.inputControl.controlName].patchValue([...this.inputControl.options.map((item: any) => item.value), 'all']);
    } else {
      this.form.controls[this.inputControl.controlName].patchValue([]);
    }
  }
  /**
   * Removes all selected option from form value if not all options are selected on click event
   */
  public otherOptionSelected() {
    const mapOptions = this.inputControl.options ? [...this.inputControl.options.map((item: any) => item.value), 'all'] : [];
    const formControl = this.form.controls[this.inputControl.controlName].value;

    if (!isEqual(mapOptions, formControl) && this.inputControl.displaySelectAllOption) {
      this.form.controls[this.inputControl.controlName].patchValue([
        ...this.form.controls[this.inputControl.controlName].value.filter((item: string) => item !== 'all'),
      ]);
    }
    if (isEqual([...formControl.map((item: string) => item), 'all'], mapOptions) && this.inputControl.displaySelectAllOption) {
      this.form.controls[this.inputControl.controlName].patchValue(mapOptions);
    }
  }
  /**
   * CHecks if any object value equals another object or value
   */
  public isEqual(isValue: any, value: any): boolean {
    return isEqual(isValue, value);
  }
  /**
   * Initializes from group values
   */
  private initializeFormGroup(inputControl: IControlBaseModel) {
    this.form = this.fb.group({
      [inputControl.controlName]: this.hiddenControl(inputControl),
    });
    if (inputControl.controlType !== this.inputTypeEnum.DROPDOWN_OPTION_GROUP) {
      this.onControlChanges();
    }
    if (inputControl.controlType === this.inputTypeEnum.AUTOCOMPLETE && inputControl.options) {
      this.backupOptions = clone(inputControl.options as IAutocompleteOptionModel[]);
      this.filterAutocompleteInit();
    }
    if (inputControl.controlType === this.inputTypeEnum.DROPDOWN_MULTI && inputControl.options) {
      if (this.formValue.length === 1 && this.formValue.includes('all')) {
        this.form.controls[inputControl.controlName].patchValue([...inputControl.options.map((item: any) => item.value), 'all']);
      }
    }
  }
  /**
   * Set hidden form control control
   */
  private hiddenControl(inputControl: IControlBaseModel) {
    const validators = inputControl.validators ? inputControl.validators : [];
    const updateOn = inputControl.updateOn ? inputControl.updateOn : 'change';
    return inputControl.hidden || inputControl.disabled
      ? [{ value: this.formValue, disabled: true }]
      : [this.formValue, { validators: validators, updateOn }];
  }
  /**
   * Sets filtered options observable
   */
  private filterAutocompleteInit() {
    this.filteredOptions$ = this.form.get(this.inputControl.controlName)?.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value))
    );
  }
  /**
   * Checks if a selection option has been selected by autocomplete options
   */
  public isSelected(controlName: string, option: { key: string; value: string | string[] }): boolean {
    if (controlName === this.filterOptionControl) {
      if (!Array.isArray(option.value)) {
        return this.selectedOptions.indexOf(option.value) < 0;
      } else {
        return differenceWith(option.value, this.selectedOptions, isEqual).length !== 0;
      }
    }
    return true;
  }
  /**
   * Loops through option list turns list of string to an array and returns true if values match
   * Filters out existing selection single value and array values
   */
  public isSelectedList(controlName: string, option: { key: string; value: string }): boolean {
    let isOption: string | string[] = '';
    if (option.value.includes(',')) isOption = option.value.split(',');
    else if (isOption.includes('.') && !option.value.includes(',')) isOption = option.value;
    else isOption = option.value;

    if (controlName === this.filterOptionControl) {
      if (!Array.isArray(isOption)) {
        return this.selectedOptions.indexOf(isOption) < 0;
      } else {
        return differenceWith(isOption, this.selectedOptions, isEqual).length !== 0;
      }
    }
    return true;
  }
  /**
   * Filters through backup options
   */
  private filter(value: string | string[]) {
    if (Array.isArray(value)) {
      return this.backupOptions.filter((option) => option.value === value);
    }
    const str = value;
    const filterValue = str.toLowerCase();
    return this.backupOptions.filter((option) => option.key.toLowerCase().includes(filterValue));
  }
  /**
   * When a field input is triggered onControlChanges outputs {controlName: value} changes through
   */
  public onControlChanges() {
    this.form.valueChanges.subscribe((valueChanges) => {
      this.formControlChanges.emit(valueChanges);
    });
  }
  /**
   * Maps dropdown group options output value
   */
  public onDropdownOptionGroupChanges(controlName: string, options: IDropdownOptionGroup<any>[], changedValue: any[]) {
    const changedDropdownValue: any = [];
    options.forEach((optionGroup) => {
      optionGroup.options.forEach((option: any) => {
        changedValue.forEach((value) => {
          if (option.value === value) {
            changedDropdownValue.push({ [option.label]: option.value });
          }
        });
      });
    });
    this.formControlChanges.emit({ [controlName]: changedDropdownValue });
  }
  /**
   * Outputs addItem value changes
   */
  public addValueToSelectionList(valueChanges: { [key: string]: { [key: string]: { [key: string]: any } } }) {
    this.addItem.emit(valueChanges);
  }
  /**
   * Outputs removeItem value changes
   */
  public removeValueToSelectionList(removeValueChanges: { [key: string]: { [key: string]: { [key: string]: any } } }) {
    this.removeItem.emit(removeValueChanges);
  }
  /**
   * File form value changes
   */
  public fileValue(event: any) {
    const file = event.target.files[0];
    this.form.get(this.inputControl.controlName)?.patchValue(file);
    this.formControlChanges.emit(this.form.value);
  }
  /**
   * Custom File form value changes
   */
  public fileFormValueChanges(valueChanges: { [key: string]: { [key: string]: { [key: string]: any } } }) {
    this.formControlChanges.emit(valueChanges);
  }
  /**
   * Suffix icon click action
   */
  public onResetFormValue() {
    this.form.reset();
    this.form.get(this.inputControl.controlName)?.patchValue('');
  }
  /**
   * Copy the link and change form button
   */
  public copyLink(element: any) {
    navigator.clipboard
      .writeText(this.form.get(this.inputControl.controlName)?.value)
      .then()
      .catch((e) => console.error(e));
    this.toggleColor = false;
    element.textContent = 'Copied';
  }
}
