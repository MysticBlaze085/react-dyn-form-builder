import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';

import { AuthService } from '../services';

@Directive({
  selector: '[libUsername]',
  standalone: true,
})
export class UserDetailsDirective {
  private isViewCreated = false;
  private readonly context = new CurrentUserContext();
  private readonly authService = inject(AuthService);

  @Input('libUsername') set username(val: string | undefined) {
    const currentUser = this.authService.currentUser();
    this.context.username = currentUser?.userName ?? 'Username Not Found';
    this.context.email = currentUser?.email ?? currentUser?.userName ?? 'Email Not Found';
    this.context.firstName = currentUser?.firstName ?? 'First Name Not Found';
    this.context.lastName = currentUser?.lastName ?? 'Last Name Not Found';
    this.context.orgZid = currentUser?.orgZid ?? 'Org ZID Not Found';
    this.context.userZid = currentUser?.userZid ?? 'User ZID Not Found';

      if (!this.isViewCreated) {
        this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
        this.isViewCreated = true;
      }
  }

  constructor(private readonly viewContainerRef: ViewContainerRef, private readonly templateRef: TemplateRef<CurrentUserContext>) {}

  static ngTemplateContextGuard(directive: UserDetailsDirective, context: unknown): context is CurrentUserContext {
    return true;
  }
}

class CurrentUserContext {
  username = '';
  email = '';
  firstName = '';
  lastName = '';
  orgZid = '';
  userZid = '';
}
