import { CommonModule } from '@angular/common';
import { LoadingToastComponent } from './loading-toast.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [LoadingToastComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [LoadingToastComponent],
})
export class LoadingToastModule {}
