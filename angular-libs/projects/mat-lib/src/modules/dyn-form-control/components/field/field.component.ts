import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IconEventEnums, TextIconEnums } from '@core/shared/modules/lyn-insight-icon/models';
import { Subject, takeUntil } from 'rxjs';

import { FieldControlEnums } from './api/field-control.enums';
import { FieldControlModel } from './api/field-control.models';
import { FieldTypes } from './api';
import { ImperativeObservable } from '@core/util';
import { NgStyle } from '@angular/common';
import { TooltipPosition } from '@angular/material/tooltip';
import { UntypedFormControl } from '@angular/forms';
import { isArray } from 'lodash';

@Component({
  selector: 'lyn-field',
  templateUrl: './field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Represents a field component used in dynamic form control.
 */
export class FieldComponent implements OnChanges, OnDestroy {
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
  @Input() public fieldControl!: FieldControlModel<FieldTypes>;
  /**
   * Existing value of field control
   */
  @Input() public formValue!: FieldTypes;
  /**
   * Tooltip positioning
   */
  @Input() public toolTipPosition: TooltipPosition = 'above';
  /**
   * Input property to receive the value from the parent component
   */
  @Input() public valueToDisplay!: string;
  /**
   * Sets custom display value
   */
  @Input() public customDisplayValue?: string;
  /**
   * Value changes emits to parent
   */
  @Output() public valueChanges: EventEmitter<{ [key: string]: FieldTypes }> = new EventEmitter<{ [key: string]: FieldTypes }>();

  /**
   * Form Control sets reactive form control
   */
  public formControl!: { [key: string]: UntypedFormControl };
  /**
   * Field input display enums
   */
  public fieldControlEnums = FieldControlEnums;
  /**
   * Icons enums
   */
  public iconTypeEnum = TextIconEnums;
  /**
   * Icon event enums
   */
  public iconEventType = IconEventEnums;
  /**
   * Hides password input value and icon change
   */
  public isHiddenPassword = true;
  /**
   * Destroys subscriptions on destroy
   */
  public onDestroy = new Subject();
  /**
   * Custom display
   */
  public customDisplay = new ImperativeObservable<string>('Example Custom Display');

  public firstChange: boolean = false;

  public ngOnChanges({ fieldControl, formValue, valueToDisplay, customDisplayValue }: SimpleChanges) {
    this.firstChange = false;
    if (fieldControl?.currentValue && fieldControl.firstChange) {
      this.firstChange = fieldControl.firstChange;
      this.fieldControl = fieldControl.currentValue;
      this.formValue = formValue?.currentValue !== undefined && formValue.firstChange ? formValue.currentValue : this.fieldControl.value;
      this.formControl = {
        [this.fieldControl.controlName]: new UntypedFormControl(this.formValue, this.fieldControl.validators),
      };
      this.initializeFieldControl();
      if (valueToDisplay?.currentValue) this.valueToDisplay = valueToDisplay.currentValue;
    }
    if (formValue?.currentValue) this.formControl[this.fieldControl.controlName].patchValue(formValue.currentValue);
    if (customDisplayValue?.currentValue) this.customDisplay.value = customDisplayValue.currentValue;
  }
  /**
   * Controls when event emitter will trigger,
   * solves initial changed detection errors and multiple triggers emitting to parent unnecessarily
   */
  @HostListener('window:keydown')
  public handleKeyboardEvent() {
    this.firstChange = false;
  }
  @HostListener('window:click')
  public handleMouseEvent() {
    this.firstChange = false;
  }
  /**
   * Initialize Field Control
   */
  private initializeFieldControl() {
    if (this.fieldControl && this.formControl) {
      this.formControl[this.fieldControl.controlName].valueChanges.pipe(takeUntil(this.onDestroy)).subscribe({
        next: (formControlValue: FieldTypes) => {
          const value = isArray(formControlValue)
            ? (formControlValue as string[]).filter((val: string) => val !== 'all')
            : formControlValue;
          if (!this.firstChange) this.valueChanges.emit({ [this.fieldControl.controlName]: value });
        },
      });

      if (this.fieldControl.disabled) {
        this.formControl[this.fieldControl.controlName].disable();
      } else {
        this.formControl[this.fieldControl.controlName].enable();
      }
    }
  }
  /**
   * File form value changes
   */
  public fileValue(event: any) {
    const file = event.target.files[0];
    this.formControl[this.fieldControl.controlName]?.patchValue(file);
  }
  /**
   * Destroys subscriptions
   */
  public ngOnDestroy() {
    this.onDestroy.complete();
    this.onDestroy.unsubscribe();
    this.customDisplayValue = undefined;
  }
  /**
   * Suffix icon click action
   */
  public onResetFormValue() {
    this.formControl[this.fieldControl.controlName].reset();
  }
}
