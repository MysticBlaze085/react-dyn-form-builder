import { A11yModule } from '@angular/cdk/a11y';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DynFormDirectivesModule } from '../../directives/dyn-form-directives.module';
import { FieldComponent } from './field.component';
import { LynInsightIconModule } from '@core/shared/modules/lyn-insight-icon/lyn-insight-icon.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  declarations: [FieldComponent],
  imports: [
    CommonModule,
    DynFormDirectivesModule,
    A11yModule,
    CdkTreeModule,
    CommonModule,
    DragDropModule,
    ReactiveFormsModule,
    LynInsightIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTooltipModule,
    TextFieldModule,
    MatRippleModule,
    MatButtonModule,
  ],
  exports: [FieldComponent],
})
export class FieldModule {}
