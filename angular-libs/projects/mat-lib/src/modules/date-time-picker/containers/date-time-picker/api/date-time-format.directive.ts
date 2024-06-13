/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Directive, HostListener, Input, Optional } from '@angular/core';
import { FormControlDirective, FormControlName } from '@angular/forms';

@Directive({
  selector: 'input[lynDateTimeFormat]',
})
export class DateTimeFormatDirective {
  /**
   * Update number value to updateTo if value is 0 and not undefined
   */
  @Input() updateTo?: string;
  /**
   * Form control directive get the form control from input
   * form control name gets the form control name value
   */
  constructor(@Optional() private formControlDir: FormControlDirective, @Optional() private formControlName: FormControlName) {}
  /**
   * Listens for an on blur event trigger
   */
  @HostListener('blur')
  /**
   * Listens for an on change event trigger
   */
  @HostListener('change')
  /**
   * Listens for a keydown.enter event trigger
   */
  @HostListener('keydown.enter')
  /**
   * Set time format values
   */
  public setDateTimeValue() {
    const control = this.formControlDir?.control || this.formControlName?.control;
    if (control.value && control.valid) {
      let hour = control.value.split(':')[0];
      let min = control.value.split(':')[1];
      let sec = control.value.split(':')[2];
      hour = hour ? hour : '12';
      min = min ? min : '00';
      sec = sec ? sec : '00';
      hour = (hour + '').length === 1 ? `0${hour}` : hour;
      min = (min + '').length === 1 ? `0${min}` : min;
      sec = (sec + '').length === 1 ? `0${sec}` : sec;
      const isTimeFormat = `${hour}:${min}:${sec}`;
      control.setValue(isTimeFormat);
    }
  }
}
