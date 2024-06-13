import { AbstractControl, ValidatorFn } from '@angular/forms';

export class DateTimePickerValidationHelper {
  /**
   * Reactive form customer validator
   */
  public dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const strLen = control.value.split(':').length;
      const regex = strLen > 2 ? /^(2[0-3]|[0-1]?[\d]):[0-5][\d]:[0-5][\d]$/gm : /^(1[0|1|2]|[1-9]):[0-5][\d]$/gm;
      const matchRegex = regex.test(control.value);
      const message = 'Required standard time format';
      if (!matchRegex) {
        return { customInvalidMessage: { message } };
      }
      return null;
    };
  }
  /**
   * Check for bad characters
   */
  public dateTimeBadeCharValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      // gets time format values
      const hour = control.value.split(':')[0];
      const min = control.value.split(':')[1];
      const sec = control.value.split(':')[2];
      const regexChar = new RegExp('^[0-9]');
      const message = 'Only numerical values';
      if ((hour && hour.length > 2) || (hour && !regexChar.test(hour))) {
        return { customInvalidMessage: { message } };
      }
      if ((min && min.length > 2) || (min && !regexChar.test(min))) {
        return { customInvalidMessage: { message } };
      }
      if ((sec && sec.length > 2) || (sec && !regexChar.test(sec))) {
        return { customInvalidMessage: { message } };
      }
      return null;
    };
  }
}
