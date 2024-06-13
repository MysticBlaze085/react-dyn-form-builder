import { NgModule } from '@angular/core';
import { FormInputControlModule } from './components/form-input-control/form-input-control.module';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  imports: [FormInputControlModule],
  exports: [DirectivesModule, FormInputControlModule],
})
export class LynDynFormModule {}
