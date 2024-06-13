import { CommonModule } from '@angular/common';
import { GatewaysSelectorComponent } from './gateways-selector.component';
import { LynDynFormModule } from '@core/shared/modules/lyn-dyn-form/lyn-dyn-form.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GatewaysSelectorComponent],
  imports: [CommonModule, ReactiveFormsModule, LynDynFormModule],
  exports: [GatewaysSelectorComponent],
})
export class GatewaysSelectorModule {}
