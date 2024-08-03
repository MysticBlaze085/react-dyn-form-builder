import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TwCheckboxComponent } from '../types/tw-checkbox.component';
import { TwThComponent } from './tw-th.component';
import { TwTypographyComponent } from './utils/typography.component';

@Component({
    selector: 'tw-default-table',
    standalone: true,
    imports: [CommonModule, TwThComponent, TwTypographyComponent, TwCheckboxComponent],
    template: `
        <table class="w-full text-left table-auto min-w-max">
            <thead>
                <tr>
                    @if (isSelectable) {
                    <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-1 max-w-[10px]">
                        <tw-checkbox></tw-checkbox>
                    </th>
                    } @for (header of headers; track $index ) {
                    <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-3 cursor-pointer">
                        <tw-typography
                            [variant]="'small'"
                            [color]="'blue-gray'"
                            [classStyle]="'flex items-center justify-between gap-2 font-normal leading-none opacity-70'"
                            >{{ header }}</tw-typography
                        >
                    </th>
                    }
                </tr>
            </thead>
        </table>
    `,
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `,
    ],
})
export class TwDefaultTableComponent {
    @Input() isSelectable = false;
    @Input() isSortable = false;
    @Input() isDraggable = false;
    @Input() headers: string[] = ['Header 1', 'Header 2', 'Header 3'];
}
