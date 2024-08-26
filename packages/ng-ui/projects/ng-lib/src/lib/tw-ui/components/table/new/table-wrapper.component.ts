import { AfterViewInit, Component, Input, OnInit, ViewChild, inject } from '@angular/core';

import { AdkTable } from '../directives/table';
import { CommonModule } from '@angular/common';
import { RowData } from '../../../../tw-form-ui';
import { TableComponent } from './table.component';
import { TableHeaderComponent } from './table-header.component';
import { TwCardComponent } from '../../card/tw-card.component';

@Component({
    selector: 'tw-table-wrapper',
    standalone: true,
    imports: [CommonModule, TwCardComponent, TableComponent, TableHeaderComponent, AdkTable],
    hostDirectives: [AdkTable],
    template: `
        <tw-card>
            <div class="adk-card-header">
                <tw-table-header
                    [title]="tableHeader.title"
                    [subtitle]="tableHeader.subtitle"
                    [isSearchable]="tableHeader.isSearchable"
                    [buttons]="tableHeader.buttons"
                ></tw-table-header>
            </div>
            <div class="adk-card-body">
                <tw-table
                    #table
                    [data]="data"
                    [columns]="columns"
                    [isSelectable]="isSelectable"
                    [isDraggable]="isDraggable"
                    [isSortable]="isSortable"
                ></tw-table>
            </div>
            @if (data.length > 5) {
            <div class="adk-card-footer">
                <!-- <tw-table-footer (actionButtonClicked)="actionButtonTriggered()"></tw-table-footer> -->
            </div>
            }
        </tw-card>
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
export class TableWrapperComponent implements OnInit, AfterViewInit {
    @ViewChild('table') table!: TableComponent;
    @Input() data: RowData[] = [];
    @Input() columns: string[] = [];
    @Input() isDraggable = false;
    @Input() isSelectable = false;
    @Input() isSortable = false;

    @Input() tableHeader: { title: string; subtitle: string; isSearchable: boolean; buttons: any[] } = {
        title: 'Table Header',
        subtitle: 'Table Subtitle',
        isSearchable: false,
        buttons: [],
    };

    ngAfterViewInit(): void {
        console.log('TableWrapperComponent AfterViewInit', this.table.adkTable.state());
    }

    ngOnInit() {
        console.log('TableWrapperComponent OnInit', this.data);
    }
}
