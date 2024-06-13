import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../../directives/directives.module';
import { LynInsightIconModule } from '@core/shared/modules/lyn-insight-icon/lyn-insight-icon.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectionListControlComponent } from './selection-list-control.component';

@NgModule({
  declarations: [SelectionListControlComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    LynInsightIconModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
  ],
  exports: [SelectionListControlComponent],
})
export class SelectionListControlModule {}
