import { ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from './components';
import { ModalService } from './services';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  declarations: [ModalComponent],
  exports: [MatDialogModule, MatIconModule, MatButtonModule],
  providers: [ModalService],
})
export class DynModalModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: DynModalModule,
      providers: [ModalService],
    };
  }
}
