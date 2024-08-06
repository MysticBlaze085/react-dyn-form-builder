import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, TemplateRef, inject } from '@angular/core';
import { SortableIconComponent, TwTypographyComponent } from './utils';

import { CheckboxComponent } from '../../../tw-form-ui/components/types/checkbox.component';
import { CommonModule } from '@angular/common';
import { RowData } from './models';
import { TableDataSourceService } from './table-datasource.service';
import { field } from './utils/select.config';

@Component({
    selector: 'tw-default-table',
    templateUrl: './tw-table.component.html',
    standalone: true,
    imports: [CommonModule, TwTypographyComponent, CheckboxComponent, SortableIconComponent],
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
export class TwDefaultTableComponent implements OnChanges {
    @Input() isSelectable = false;
    @Input() isSortable = false;
    @Input() isDraggable = false;
    @Input() headers: string[] = [];
    @Input() actionColName?: string;
    @Input() actionButton?: TemplateRef<any> | string;
    @Input() rows: RowData[] = [];
    @Input() groupBy = '';

    tdss: TableDataSourceService = inject(TableDataSourceService);

    groupData: { [key: string]: RowData[] } = { '': this.tdss.get('dataSource') };
    field = field;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isSelectable']) this.isSelectable = changes['isSelectable'].currentValue;
        if (changes['isSortable']) this.isSortable = changes['isSortable'].currentValue;
        if (changes['isDraggable']) this.isDraggable = changes['isDraggable'].currentValue;
        if (changes['headers']) this.tdss.setHeaders(this.headers);
        if (changes['rows']) this.tdss.setTableDataSource(this.rows);
        if (changes['groupBy']) this.tdss.setGroupBy(this.groupBy);

        this.updateGroupData();
    }

    private updateGroupData(): void {
        const groupByVar = this.tdss.get('preferences').groupBy;
        this.groupData =
            groupByVar && groupByVar !== ''
                ? this.groupByData(this.tdss.get('dataSource'), groupByVar)
                : ({ '': this.tdss.get('dataSource') } as { [key: string]: RowData[] });
    }

    colSpanNum(): number {
        return this.tdss.get('headers').length + (this.isSelectable ? 1 : 0) + (this.actionButton ? 1 : 0);
    }

    objectKeysGroupData(obj: any): string[] {
        return Object.keys(obj);
    }

    // @ts-ignore
    private groupByData(array: RowData[], key: string): { [key: string]: RowData[] } {
        const gKey = key.toLowerCase();
        return array.reduce((result, currentValue) => {
            const normalizedCurrentValue: RowData = Object.keys(currentValue).reduce((acc, k) => {
                acc[k.toLowerCase()] = currentValue[k];
                return acc;
            }, {} as RowData);

            const groupKey = normalizedCurrentValue[gKey] as string;
            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            result[groupKey].push(currentValue);
            return result;
        }, {} as { [key: string]: RowData[] });
    }

    onRowClick(event: any): void {
        // Handle the checkbox change here
        console.log('Checkbox changed:', event);
        // Update your data or perform actions based on the checkbox state
    }

    get allRowsSelected(): boolean {
        const dataSource = this.tdss.get('dataSource');
        const selectedRows = this.tdss.get('selectedRows');
        return dataSource.length > 0 && selectedRows.length === dataSource.length;
    }

    isRowSelected(rowData: any): boolean {
        return this.tdss.get('selectedRows').some((selectedRow: any) => JSON.stringify(selectedRow) === JSON.stringify(rowData));
    }

    toggleRowSelection() {
        this.tdss.toggleSelectedAllRows();
    }

    sortRows(key: string): void {
        const groupByKey = this.tdss.get('preferences').groupBy ?? '';
        const currentDirection = this.tdss.get('sortDataSource').direction;
        const newDirection: 'ascending' | 'descending' = currentDirection === 'ascending' ? 'descending' : 'ascending';

        this.tdss.sortDataSource({ key, direction: newDirection });
        this.updateGroupData();
    }

    // Figure out how to drag from initial index and drop on target index

    // dragRows(index: number) {
    //     this.draggableUtil.dragRows(this, index);
    // }
}
