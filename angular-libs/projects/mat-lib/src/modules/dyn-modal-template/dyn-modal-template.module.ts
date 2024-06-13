import { ModalButtonComponent, ModalTemplateComponent, ModalWrapperComponent } from './components';

import { CommonModule } from '@angular/common';
import { DynFormModule } from '@core/shared/modules/dyn-form-control/dyn-form.module';
import { LynDynFormModule } from '@core/shared/modules/lyn-dyn-form/lyn-dyn-form.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModalButtonComponent, ModalTemplateComponent, ModalWrapperComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, LynDynFormModule, DynFormModule],
  exports: [ModalButtonComponent, ModalTemplateComponent, ModalWrapperComponent],
})
export class DynModalTemplateModule {}
