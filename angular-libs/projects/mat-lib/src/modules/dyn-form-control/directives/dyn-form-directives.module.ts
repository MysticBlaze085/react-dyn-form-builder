import { NgModule } from '@angular/core';
import { SharedPipeModule } from '@core/shared/pipes';
import { DisabledControlDirective } from './disabled-control.directive';
import { TrimFormFieldsDirective } from './trim-form-fields.directive';

@NgModule({
  declarations: [TrimFormFieldsDirective, DisabledControlDirective],
  exports: [SharedPipeModule, TrimFormFieldsDirective, DisabledControlDirective],
})
export class DynFormDirectivesModule {}
