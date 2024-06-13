import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../../directives/directives.module';
import { DynModalModule } from '@core/shared/modules/dyn-modal/dyn-modal.module';
import { EditFileComponent } from '../file-input-control/edit-file/edit-file.component';
import { FileInputControlComponent } from '../file-input-control/file-input-control.component';
import { FormInputControlComponent } from './form-input-control.component';
import { LynInsightIconModule } from '@core/shared/modules/lyn-insight-icon/lyn-insight-icon.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectionListControlModule } from '../selection-list-control/selection-list-control.module';

@NgModule({
  declarations: [FormInputControlComponent, FileInputControlComponent, EditFileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule,
    SelectionListControlModule,
    LynInsightIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    DynModalModule,
  ],
  exports: [FormInputControlComponent],
})
export class FormInputControlModule {}
