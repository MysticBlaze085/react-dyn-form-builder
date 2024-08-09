import { Component, Input } from '@angular/core';

import { ButtonComponent } from '../button.component';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '../../../tw-form-ui/components/types/select.component';
import { TwTypographyComponent } from '../typography.component';
import { paginationSelector } from './utils';

@Component({
    selector: 'tw-table-footer',
    standalone: true,
    template: `
        <div class="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <tw-typography variant="small" color="blue-gray" class="w-full" classStyle="flex flex-row font-normal">
                <span class="flex flex-col justify-center mr-2" style="white-space: 'nowrap'">
                    Page {{ currentPage }} of {{ totalPages }}
                </span>
                <adk-select [field]="field"></adk-select>
            </tw-typography>
            @if(totalPages > 1){
            <div class="flex gap-2">
                <adk-button size="sm" color="blue" disabled="{{ currentPage <= 1 }}" (click)="handlePreviousClick()"> Previous </adk-button>
                <adk-button size="sm" color="blue" disabled="{{ currentPage >= totalPages }}" (click)="handleNextClick()">
                    Next
                </adk-button>
            </div>
            }
        </div>
    `,
    imports: [CommonModule, TwTypographyComponent, ButtonComponent, SelectComponent],
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `,
    ],
})
export class TwTableFooterComponent {
    @Input() currentPage = 1;
    @Input() totalPages = 1;

    field = paginationSelector;
}
