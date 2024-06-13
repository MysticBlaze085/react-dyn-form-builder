import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { DropdownFieldModule } from './components/dropdown-field/dropdown-field.module';
import { DynFormComponent } from './container';
import { DynFormDirectivesModule } from './directives/dyn-form-directives.module';
import { FieldModule } from './components/field/field.module';
import { LynInsightIconModule } from '../lyn-insight-icon/lyn-insight-icon.module';
import { NgModule } from '@angular/core';
import { RadioFieldModule } from './components/radio-field/radio-field.module';

@NgModule({
  declarations: [DynFormComponent],
  imports: [
    CommonModule,
    LynInsightIconModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownFieldModule,
    FieldModule,
    RadioFieldModule,
  ],
  exports: [
    DynFormComponent,
    DropdownFieldModule,
    FieldModule,
    RadioFieldModule,
    DynFormDirectivesModule,
  ],
})
export class DynFormModule {}
