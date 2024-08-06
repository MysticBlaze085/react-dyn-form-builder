import { Component, Input, OnChanges, SimpleChanges, TemplateRef, inject, signal } from '@angular/core';
import { SortableIconComponent, TwTypographyComponent } from './utils';

import { CommonModule } from '@angular/common';
import { TableDataSourceService } from './services/table-datasource.service';
import { TwCheckboxComponent } from '../types/tw-checkbox.component';

@Component({
    selector: 'tw-default-table',
    standalone: true,
    imports: [CommonModule, TwTypographyComponent, TwCheckboxComponent, SortableIconComponent],
    template: `
        <table class="w-full text-left table-auto min-w-max">
            <thead>
                <tr>
                    @if (isSelectable) {
                    <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-1 max-w-[10px]">
                        <tw-checkbox
                            [checked]="this.tdss.get('selectedRows').length === this.tdss.get('dataSource').length"
                            (change)="toggleRowSelection(rowData)"
                        ></tw-checkbox>
                    </th>
                    } @for(header of this.tdss.get('headers'); track $index) {
                    <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-3 cursor-pointer">
                        <tw-typography
                            [variant]="'small'"
                            [color]="'blue-gray'"
                            [classStyle]="'flex items-center justify-between gap-2 font-normal leading-none opacity-70'"
                        >
                            {{ header ?? ' ' }}
                            <div class="flex flex-row gap-2">
                                @if(index !== this.tdss.get('headers').length -1 && isSortable) {
                                <tw-sortable-icon (click)="sortRows(header, groupData)"></tw-sortable-icon>
                                } @if(this.tdss.get('sortDataSource').key === header && isSortable) {
                                <span>{{ this.tdss.get('sortDataSource').direction === 'ascending' ? '🔼' : '🔽' }}</span>
                                }
                            </div>
                        </tw-typography>
                    </th>
                    } @if(actionButton) {
                    <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-3">
                        <tw-typography
                            [variant]="'small'"
                            [color]="'blue-gray'"
                            [classStyle]="'flex items-center justify-between gap-2 font-normal leading-none opacity-70'"
                        >
                            {{ actionColName ?? '' }}
                        </tw-typography>
                    </th>
                    }
                </tr>
            </thead>
            <tbody>
                @for(groupKey of objectKeysGroupData(groupData); track $index) { @if(groupBy) {
                <tr>
                    <td [colSpan]="colSpanNum" class="p-0">{{ groupKey }}</td>
                </tr>
                } @else { @for(rowData of groupData[groupKey]; track $index) { @if (isSelectable) {
                <tr>
                    <td [ngClass]="isSelectable ? 'p-1' : 'p-2'" class="border-b border-blue-gray-50 p-1 max-h-[38px] max-w-[15px]">
                        <tw-checkbox [checked]="isRowSelected(rowData)" (change)="onRowClick(rowData)" class="w-4 h-4"></tw-checkbox>
                    </td>
                    @for(key of headers; track $index) {
                    <td
                        [ngClass]="isSelectable ? 'p-1' : 'p-2'"
                        class="border-b border-blue-gray-50 max-h-[40px] min-w-[60px] max-w-[60px]"
                    >
                        <tw-typography [variant]="'small'" [color]="'blue-gray'" class="font-normal ml-2">
                            {{ rowData[key.toLowerCase()] }}
                        </tw-typography>
                    </td>
                    <!-- @if (actionButton) {
                    <td class="border-b border-blue-gray-50 p-2 max-h-[40px] min-w-[60px] max-w-[60px]">
                        <ng-container *ngTemplateOutlet="actionButton; context: { $implicit: rowData }"></ng-container>
                    </td>
                    } -->
                    }
                </tr>
                } } } }
            </tbody>
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
export class TwDefaultTableComponent implements OnChanges {
    @Input() isSelectable = false;
    @Input() isSortable = false;
    @Input() isDraggable = false;
    @Input() headers: string[] = [];
    @Input() actionColName?: string;
    @Input() actionButton?: TemplateRef<any> | string;
    @Input() rows: { [key: string]: any }[] = [];
    @Input() groupBy = '';

    tdss: TableDataSourceService = inject(TableDataSourceService);

    groupData = { '': this.tdss.get('dataSource') };
    // selectedRow: any;
    // selectedRows: any[] = [];

    ngOnChanges({ headers, rows, groupBy, isSelectable, isSortable, isDraggable }: SimpleChanges): void {
        if (isSelectable) this.isSelectable = isSelectable.currentValue;
        if (isSortable) this.isSortable = isSortable.currentValue;
        if (isDraggable) this.isDraggable = isDraggable.currentValue;
        if (headers) this.tdss.setHeaders(this.headers);
        if (rows) this.tdss.setTableDataSource(this.rows);
        if (groupBy) this.tdss.setGroupBy(this.groupBy);
        const groupByVar = this.tdss.get('preferences').groupBy;
        this.groupData =
            groupByVar && groupByVar !== ''
                ? this.groupByData(this.tdss.get('dataSource'), groupByVar)
                : { '': this.tdss.get('dataSource') };
        console.log('Table Store', this.tdss.state);
    }

    colSpanNum(): number {
        return this.tdss.get('headers').length + (this.isSelectable ? 1 : 0) + (this.actionButton ? 1 : 0);
    }

    objectKeysGroupData(obj: any): string[] {
        return Object.keys(obj);
    }

    // @ts-ignore
    groupByData(array, key) {
        {
            const gKey = key.toLowerCase();
            // @ts-ignore
            return array.reduce((result, currentValue) => {
                const normalizedCurrentValue = {};
                for (const k in currentValue) {
                    if (currentValue.hasOwnProperty(k)) {
                        // @ts-ignore
                        normalizedCurrentValue[k.toLowerCase()] = currentValue[k];
                    }
                }
                // @ts-ignorek
                const groupKey = normalizedCurrentValue[gKey];
                if (!result[groupKey]) {
                    result[groupKey] = [];
                }
                result[groupKey].push(currentValue);
                return result;
            }, {});
        }
    }

    onRowClick(rowData: any) {
        this.tdss.setSelectedRows(rowData);
    }

    isRowSelected(rowData: any): boolean {
        return this.tdss.get('selectedRows').some((selectedRow: any) => JSON.stringify(selectedRow) === JSON.stringify(rowData));
    }

    toggleRowSelection() {
        this.tdss.toggleSelectedAllRows();
    }

    sortRows(key: string) {
        const keyGroup = this.tdss.get('preferences').groupBy ?? '';
        const direction = this.tdss.get('sortDataSource').direction === 'ascending' ? 'descending' : 'ascending';
        const sortDataSource: { key: string; direction: 'ascending' | 'descending' } = {
            key,
            direction,
        };
        this.tdss.sortDataSource(sortDataSource);
        this.groupData =
            keyGroup && keyGroup !== '' ? this.groupByData(this.tdss.get('dataSource'), keyGroup) : { '': this.tdss.get('dataSource') };
    }

    // Figure out how to drag from initial index and drop on target index

    // dragRows(index: number) {
    //     this.draggableUtil.dragRows(this, index);
    // }
}
