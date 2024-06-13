import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ModalSideDrawerComponent } from './modal-side-drawer.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ModalSideDrawerComponent],
  imports: [CommonModule, MatSidenavModule, MatButtonModule, MatIconModule],
  exports: [ModalSideDrawerComponent],
})
export class ModalSideDrawerModule {}
