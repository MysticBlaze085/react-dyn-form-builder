import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { INPUT_APPEARANCE_ENUMS, INPUT_APPEARANCE_TYPES, ISelectionListModel } from '../../models';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { DynFormInputErrorStateMatcher } from '../../utils';

@Component({
  selector: 'lyn-selection-list-control',
  templateUrl: './selection-list-control.component.html',
  styleUrls: ['./selection-list-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionListControlComponent implements OnChanges, AfterViewInit {
  /**
   * Width override
   */
  @Input() width: string = '95%';
  /**
   * Control form value
   */
  @Input() formValue: string[] = [];
  /**
   * Reactive form field control configuration
   */
  @Input() inputControl?: ISelectionListModel;
  /**
   * Sets field input appearance
   */
  @Input() inputAppearance: INPUT_APPEARANCE_TYPES = INPUT_APPEARANCE_ENUMS.OUTLINE;
  /**
   * Outputs form field control value on a triggered change event
   */
  @Output() public formControlChanges = new EventEmitter();
  /**
   * Outputs add item value
   */
  @Output() public addItem = new EventEmitter();
  /**
   * Outputs remove item value
   */
  @Output() public removeItem = new EventEmitter();
  /**
   * Error when invalid select dropdown control is dirty, touched, or submitted.
   */
  public matcher = new DynFormInputErrorStateMatcher();
  /**
   * Form group container for a field input control
   */
  public form: UntypedFormGroup = new UntypedFormGroup({});
  /**
   * Hides password input value and icon change
   */
  public isHiddenPassword = true;

  constructor(private readonly fb: UntypedFormBuilder) {}
  /**
   * Get form group controls
   */
  get formControl() {
    return this.form.controls;
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.inputControl?.disabled) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }, 500);
  }
  /**
   * Sets reactive form group if not undefined
   */
  public ngOnChanges({ inputControl, formValue }: SimpleChanges) {
    if (inputControl?.currentValue) {
      const isHidden = inputControl.currentValue.hidden
        ? [{ value: inputControl.currentValue.value, disabled: true }]
        : [inputControl.currentValue.value, inputControl.currentValue.validators];

      this.form = this.fb.group({
        [inputControl.currentValue.addControlName]: [inputControl.currentValue.addValue, inputControl.currentValue.validators],
        [inputControl.currentValue.controlName]: isHidden,
      });
      if (formValue && formValue.currentValue) {
        this.form.get(inputControl.currentValue.controlName)?.patchValue(formValue.currentValue);
      }
    }
  }
  /**
   * Adds a item to selection list, does not allow duplicate strings
   */
  public addValueToSelectionList(group: string, subGroup: string, controlName: string, addControlName: string, valueChange: string) {
    const getListControl = this.form.get(controlName) as UntypedFormGroup;
    const getListValue = getListControl.value.filter((listValue: string) => listValue !== valueChange);
    getListControl.patchValue([...getListValue, valueChange]);
    this.addItem.emit({ [group]: { [subGroup]: { [controlName]: this.form.value[controlName] } } });
    this.formControl[addControlName].reset();
    this.removeFocus(addControlName);
  }
  /**
   * Removes a selected item from list
   */
  public removeValueToSelectionList(group: string, subGroup: string, controlName: string, valueSelected: string) {
    const getListControl = this.form.get(controlName) as UntypedFormGroup;
    const filterListValue = getListControl.value.filter((listValue: string) => listValue !== valueSelected);
    getListControl.patchValue(filterListValue);
    this.removeItem.emit({ [group]: { [subGroup]: { [controlName]: this.form.value[controlName] } } });
  }
  /**
   * Resets add control input focus
   */
  public removeFocus(controlName: string) {
    this.formControl[controlName].markAsPristine();
    this.formControl[controlName].markAsUntouched();
  }
}
