import { NgModule } from '@angular/core';
import { DisabledControlDirective } from './disabled-control.directive';
import { TrimFormFieldsDirective } from './trim-form-fields.directive';

@NgModule({
  declarations: [DisabledControlDirective, TrimFormFieldsDirective],
  exports: [DisabledControlDirective, TrimFormFieldsDirective],
})
export class DirectivesModule {}
