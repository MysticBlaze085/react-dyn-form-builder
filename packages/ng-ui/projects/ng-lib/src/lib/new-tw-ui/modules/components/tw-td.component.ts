import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'tw-td',
    standalone: true,
    imports: [CommonModule],
    template: `
        <td class="p-4 border-b border-blue-gray-50">
            <ng-content></ng-content>
        </td>
    `,
})
export class TwTdComponent {}
