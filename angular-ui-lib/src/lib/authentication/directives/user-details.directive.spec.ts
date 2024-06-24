import { TemplateRef, ViewContainerRef } from '@angular/core';

import { UserDetailsDirective } from './user-details.directive';

describe('UsernameDirective', () => {
  it('should create an instance', () => {
    const viewContainerRef = {} as ViewContainerRef;
    const templateRef = {} as TemplateRef<any>;
    const directive = new UserDetailsDirective(viewContainerRef, templateRef);
    expect(directive).toBeTruthy();
  });
});
