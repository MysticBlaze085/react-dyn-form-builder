import { Component } from '@angular/core';

@Component({
  selector: 'tw-sortable-icon',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      [attr.aria-hidden]="true"
      class="w-4 h-4"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
})
export class SortableIconComponent {}
