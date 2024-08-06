import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'adk-card',
  standalone: true,
  template: `
    <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-md bg-clip-border">
      <div class="p-2">
        <ng-content [select]="'adk-card-header'"></ng-content>
        <ng-content [select]="'adk-card-content'"></ng-content>
      </div>
      <div class="p-6 pt-0">
        <ng-content [select]="'adk-card-footer'"></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {}
