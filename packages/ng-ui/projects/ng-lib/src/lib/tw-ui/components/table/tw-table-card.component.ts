import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RowData } from './models';
import { TableDataSourceService } from './table-datasource.service';
import { TwCardComponent } from '../card/tw-card.component';
import { TwDefaultTableComponent } from './tw-table.component';
import { TwTableCardHeaderComponent } from './tw-table-card-header.component';
import { TwTableFooterComponent } from './tw-table-footer.component';

@Component({
    selector: 'tw-table-card',
    standalone: true,
    imports: [CommonModule, TwCardComponent, TwDefaultTableComponent, TwTableCardHeaderComponent, TwTableFooterComponent],
    template: `
        <tw-card>
            <div class="adk-card-header">
                <tw-table-card-header
                    [title]="title"
                    [subtitle]="subtitle"
                    [buttons]="buttons"
                    (actionKeyPress)="isActionChange = !isActionChange"
                ></tw-table-card-header>
            </div>
            <div class="adk-card-body">
                <tw-default-table
                    [headers]="headers"
                    [rows]="rows"
                    [isSelectable]="isSelectable"
                    [isSortable]="isSortable"
                    [isDraggable]="isDraggable"
                    [groupBy]="this.tdss.get('preferences').groupBy"
                    [actionColName]="actionColName"
                    [actionButton]="actionButton"
                    [isPaginationAction]="paginationAction"
                    [isActionChange]="isActionChange"
                ></tw-default-table>
            </div>
            @if (rows.length > 5) {
            <div class="adk-card-footer">
                <tw-table-footer (actionButtonClicked)="actionButtonTriggered()"></tw-table-footer>
            </div>
            }
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
    tdss = inject(TableDataSourceService);
    @Input() isSelectable = false;
    @Input() isSortable = false;
    @Input() isDraggable = false;
    @Input() headers: string[] = [];
    @Input() actionColName?: string;
    @Input() actionButton?: TemplateRef<any> | string;
    @Input() rows: RowData[] = [];
    @Input() groupBy = '';
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() buttons: {
        label: string;
        onClick: () => void;
        color: 'primary' | 'secondary' | 'success' | 'warn' | 'danger';
        icon: string;
    }[] = [];
    @Output() actionKeyPress = new EventEmitter<boolean>();

    paginationAction = false;
    isActionChange = false;

    actionButtonTriggered() {
        this.paginationAction = !this.paginationAction;
    }
}
