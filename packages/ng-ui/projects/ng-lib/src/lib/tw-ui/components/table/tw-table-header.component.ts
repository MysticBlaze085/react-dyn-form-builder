import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'tw-table-header',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="tw-table-card">
            <ng-content></ng-content>
        </div>
    `,
})
export class TwTableHeaderComponent {}
