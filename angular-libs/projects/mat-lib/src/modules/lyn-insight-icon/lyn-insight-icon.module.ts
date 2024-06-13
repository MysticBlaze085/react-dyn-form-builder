import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconComponent } from './components/insight-icon/icon.component';

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  exports: [IconComponent, MatIconModule],
})
export class LynInsightIconModule {}
