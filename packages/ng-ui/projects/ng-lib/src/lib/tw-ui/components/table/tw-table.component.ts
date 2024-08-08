import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild, inject } from '@angular/core';
import { SortableIconComponent, TwTypographyComponent } from './utils';

import { AdkSelection } from '../../../tw-form-ui/directives';
import { CheckboxComponent } from '../../../tw-form-ui/components/types/checkbox.component';
import { ImperativeObservable } from '../../../utils';
import { RowData } from './models';
import { TableDataSourceService } from './table-datasource.service';

@Component({
    selector: 'tw-default-table',
    templateUrl: './tw-table.component.html',
    standalone: true,
    imports: [CommonModule, AdkSelection, AsyncPipe, TwTypographyComponent, CheckboxComponent, SortableIconComponent],
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
    @ViewChild('selection', { static: true }) selection: any;
    @Input() isSelectable = false;
    @Input() isSortable = false;
    @Input() isDraggable = false;
    @Input() headers: string[] = [];
    @Input() actionColName?: string;
    @Input() actionButton?: TemplateRef<any> | string;
    @Input() rows: RowData[] = [];
    @Input() groupBy = '';

    tdss: TableDataSourceService = inject(TableDataSourceService);
    datasource = this.tdss.get('dataSource');
    groupData = new ImperativeObservable<{ [key: string]: RowData[] }>({ key: this.tdss.get('dataSource') });
    selectedRows = new ImperativeObservable<RowData[]>(this.tdss.get('selectedRows'));
    isAllRowsSelected = new ImperativeObservable<boolean>(this.selectedRows.value.length === this.datasource.length);
    selectedIndex = new ImperativeObservable<number>(this.tdss.get('draggedColIndex') ?? 0);

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['headers']) this.tdss.setHeaders(changes['headers'].currentValue);
        if (changes['rows']) this.tdss.setTableDataSource(changes['rows'].currentValue);
        if (changes['groupBy']) this.tdss.setGroupBy(changes['groupBy'].currentValue);
        if (changes['isSelectable']) this.isSelectable = changes['isSelectable'].currentValue;
        if (changes['isSortable']) this.isSortable = changes['isSortable'].currentValue;
        if (changes['isDraggable']) this.isDraggable = changes['isDraggable'].currentValue;

        this.updateGroupData();
        this.sortRows('key');
    }

    private updateGroupData(): void {
        const groupByVar = this.tdss.get('preferences').groupBy;
        const groupData =
            groupByVar && groupByVar !== 'key'
                ? this.groupByData(this.tdss.get('dataSource'), groupByVar)
                : ({ key: this.tdss.get('dataSource') } as { [key: string]: RowData[] });
        this.groupData.value = { ...groupData };
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

    onRowSelection(rowData: any): void {
        console.log('Row selected:', rowData);
    }

    get allRowsSelected(): boolean {
        const dataSource = this.tdss.get('dataSource');
        const selectedRows = this.tdss.get('selectedRows');
        return dataSource.length > 0 && selectedRows.length === dataSource.length;
    }

    isRowSelected(rowData: any): boolean {
        console.log(
            'isRowSelected',
            this.selectedRows.value,
            rowData,
            this.selectedRows.value.some((selectedRow: any) => JSON.stringify(selectedRow) === JSON.stringify(rowData))
        );
        return this.selectedRows.value.some((selectedRow: any) => JSON.stringify(selectedRow) === JSON.stringify(rowData));
    }

    toggleSelectAll(event: Event, groupKey: string): void {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            this.tdss.toggleSelectedAllRows();
            this.groupData.value[groupKey].forEach((item) => this.selection.select(item));
        } else {
            this.tdss.toggleSelectedAllRows();
            this.selection.clear();
        }
        console.log('toggleSelectAll', this.tdss.get('selectedRows'));
    }

    toggleSelectItem(row: object): void {
        const itemStr = JSON.stringify(row);
        if (this.selection.selected(itemStr)) {
            this.selection.deselect(itemStr);
        } else {
            this.selection.select(itemStr);
        }
        this.tdss.setSelectedRows(row);
        console.log('toggleSelectItem', this.tdss.get('selectedRows'));
    }

    sortRows(key: string): void {
        const currentDirection = this.tdss.get('sortDataSource').direction;
        const newDirection: 'ascending' | 'descending' = currentDirection === 'ascending' ? 'descending' : 'ascending';

        this.tdss.sortDataSource({ key, direction: newDirection });
        this.updateGroupData();
    }

    handleDragStart(index: number): void {
        this.tdss.dragStart(index);
        console.log('dragStart', index, this.tdss.get('draggedColIndex'));
    }

    handleDragOver(event: DragEvent): void {
        event.preventDefault();
    }

    handleDrop(index: number, event: DragEvent): void {
        event.preventDefault();
        this.tdss.dragDrop(index);
        this.headers = this.tdss.get('headers');
        this.groupData.value = this.groupByData(this.tdss.get('dataSource'), this.tdss.get('preferences').groupBy ?? 'key');
    }

    // // Figure out how to drag from initial index and drop on target index
    // drop(event: CdkDragDrop<string[]>) {
    //     // const prevActive = headers[this.selectedIndex.value];
    //     // moveItemInArray(headers, event.previousIndex, event.currentIndex);
    //     this.tdss.dragStart(event.previousIndex);
    //     this.tdss.dragDrop(event.currentIndex);
    //     this.selectedIndex.value = event.currentIndex;
    // }

    // dropRow(event: any) {
    //     const data = this.groupData.value[this.groupBy ?? 'key'];
    //     moveItemInArray(data, event.previousIndex, event.currentIndex);
    // }
    // dropCol(event: any) {
    //     moveItemInArray(this.headers, event.previousIndex, event.currentIndex);
    // }
    // dragRows(index: number) {
    //     this.draggableUtil.dragRows(this, index);
    // }
}
