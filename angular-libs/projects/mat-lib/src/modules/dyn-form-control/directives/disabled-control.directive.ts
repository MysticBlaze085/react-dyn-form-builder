import { Directive, Input, OnInit, Optional } from '@angular/core';

import { NgControl } from '@angular/forms';

@Directive({
  selector: '([formControlName], [formControl])[disabledControl]',
})
export class DisabledControlDirective implements OnInit {
  /**
   * disabledControl form field attribute
   */
  @Input() public disabledControl: boolean = false;

  constructor(@Optional() private formControlDir: NgControl) {}

  ngOnInit() {
    this.setDisable();
  }
  /**
   * Sets form control status to enabled or disabled this by passes a reactive form warning:
   * It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true
   * when you set up this control in your component class, the disabled attribute will actually be set in the DOM for
   * you. We recommend using this approach to avoid 'changed after checked' errors.
   */
  public setDisable() {
    if (this.disabledControl) {
      this.formControlDir.control?.disable();
    }
  }
}
