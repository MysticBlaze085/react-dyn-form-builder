import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'adk-pill',
  standalone: true,
  imports: [CommonModule, NgClass],
  template: `
    <span class="badge badge-pill mr-0.5 text-white" [ngClass]="getRandomColor()">
      <ng-content></ng-content>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PillComponent {
  colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-amber-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];

  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
