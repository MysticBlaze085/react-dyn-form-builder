import { CommonModule } from '@angular/common';
import { DropdownFieldComponent } from './dropdown-field.component';
import { LynInsightIconModule } from '@core/shared/modules/lyn-insight-icon/lyn-insight-icon.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DropdownFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LynInsightIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  exports: [DropdownFieldComponent],
})
export class DropdownFieldModule {}
