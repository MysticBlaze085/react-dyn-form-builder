import { Directive, HostListener, Input, Optional } from '@angular/core';
import { FormControlDirective, FormControlName } from '@angular/forms';
/**
 * lynTrimVal removes trailing spaces from an input string value
 */
@Directive({
  selector: 'input[lynTrimVal]',
})
export class TrimFormFieldsDirective {
  /**
   * Form input field type
   */
  @Input() type?: string;
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
   * Trims the value from trailing spaces
   */
  public trimValue() {
    const control = this.formControlDir?.control || this.formControlName?.control;
    if (typeof control.value === 'string' && this.type !== 'password') {
      control.setValue(control.value.trim());
    }
  }
}
