import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'lyn-loading-toast',
  template: `
    <mat-spinner class="white-spinner" [diameter]="30"></mat-spinner>
    <span class="message">{{ data.message }}</span>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .message {
        margin-left: 10px;
      }
      :host::ng-deep .white-spinner circle {
        stroke: white !important;
      }
    `,
  ],
})
export class LoadingToastComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string }) {}
}
