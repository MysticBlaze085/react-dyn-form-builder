import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { RadioFieldComponent } from './radio-field.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RadioFieldComponent],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatRadioModule],
  exports: [RadioFieldComponent],
})
export class RadioFieldModule {}
