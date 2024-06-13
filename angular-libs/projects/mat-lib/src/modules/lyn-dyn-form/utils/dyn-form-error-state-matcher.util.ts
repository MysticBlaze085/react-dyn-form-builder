import { UntypedFormControl, FormGroupDirective, NgForm } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';

/**
 * Error when invalid control is dirty, touched, or submitted.
 * @DynFormInputErrorStateMatcher
 * */
export class DynFormInputErrorStateMatcher implements ErrorStateMatcher {
  /**
   * Checks error state of a reactive form control
   * @param  {FormControl|null} control
   * @param  {FormGroupDirective|NgForm|null} form
   */
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
