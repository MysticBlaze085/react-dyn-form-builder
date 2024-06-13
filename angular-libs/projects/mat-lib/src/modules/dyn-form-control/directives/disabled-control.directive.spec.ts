/* eslint-disable @typescript-eslint/no-empty-function */

import { UntypedFormControl, NgControl } from '@angular/forms';

import { DisabledControlDirective } from './disabled-control.directive';

describe('DisabledControlDirective', () => {
  let ngControl: jasmine.SpyObj<NgControl>;
  let directive: DisabledControlDirective;

  beforeEach(() => {
    ngControl = new UntypedFormControl() as any;
    directive = new DisabledControlDirective(ngControl);
  });

  it('should disable control', () => {
    spyOn(directive, 'setDisable');
    directive.disabledControl = true;
    directive.ngOnInit();
    directive.setDisable();
    expect(directive.setDisable).toHaveBeenCalled();
  });
});
