import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RowData } from './models';
import { TwCardComponent } from '../card/tw-card.component';
import { TwDefaultTableComponent } from './tw-table.component';

@Component({
    selector: 'tw-table-card',
    standalone: true,
    imports: [CommonModule, TwCardComponent, TwDefaultTableComponent],
    template: `
        <tw-card>
            <div tw-card-header>
                <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    UI/UX Review Check
                </h5>
            </div>
            <div tw-card-body>
                <tw-default-table
                    [headers]="headers"
                    [rows]="rows"
                    [isSelectable]="isSelectable"
                    [isSortable]="isSortable"
                    [isDraggable]="isDraggable"
                    [groupBy]="groupBy"
                    [actionColName]="actionColName"
                    [actionButton]="actionButton"
                ></tw-default-table>
            </div>
        </tw-card>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `,
    ],
})
export class TwTableCardComponent {
    @Input() isSelectable = false;
    @Input() isSortable = false;
    @Input() isDraggable = false;
    @Input() headers: string[] = [];
    @Input() actionColName?: string;
    @Input() actionButton?: TemplateRef<any> | string;
    @Input() rows: RowData[] = [];
    @Input() groupBy = '';
}
