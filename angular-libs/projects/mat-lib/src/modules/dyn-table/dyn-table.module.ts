import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from '../card/card.module';
import { CommonModule } from '@angular/common';
import { DualDetailTableComponent } from './components/table-base/dual-detail-table/dual-detail-table.component';
import { DynFormModule } from '../dyn-form-control/dyn-form.module';
import { GhostTableComponent } from './components/ghost-table/ghost-table.component';
import { LynDynFormModule } from '../lyn-dyn-form/lyn-dyn-form.module';
import { LynInsightIconModule } from '../lyn-insight-icon/lyn-insight-icon.module';
import { LynTableComponent } from './components';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { SharedPipeModule } from '@core/shared/pipes';
import { TableBaseComponent } from './components/table-base/table-base.component';

@NgModule({
  declarations: [LynTableComponent, TableBaseComponent, DualDetailTableComponent, GhostTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatSnackBarModule,
    LynInsightIconModule,
    CardModule,
    LynDynFormModule,
    DynFormModule,
    SharedPipeModule,
  ],
  exports: [LynTableComponent, DualDetailTableComponent],
})
export class DynTableModule {}
