import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
    selector: 'tw-th',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div [ngClass]="classStyle">
            <ng-content></ng-content>
        </div>
    `,
    styles: [
        `
            :host {
                display: table-cell;
            }
        `,
    ],
})
export class TwThComponent {
    @Input() classStyle = 'border-b border-blue-gray-100 bg-blue-gray-50 cursor-pointer';
}
