import { AdkFormGroup, AdkSelection } from '../../../tw-form-ui/directives';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    inject,
} from '@angular/core';
import { Field, RowData } from '../../../tw-form-ui';
import { SortableIconComponent, cellSelector } from './utils';

import { AdkExpansionPanelComponent } from '../expansion-panel.component';
import { AdkTooltipDirective } from '../../../tw-form-ui/directives/tooltip';
import { CheckboxComponent } from '../../../tw-form-ui/components/types/checkbox.component';
import { FieldComponent } from '../../../tw-form-ui/components/field.component';
import { ImperativeObservable } from '../../../utils';
import { Observable } from 'rxjs';
import { TableDataSourceService } from './table-datasource.service';
import { TwTypographyComponent } from '../typography.component';

//TODO: attach to selected values if selectable string array value should change to what values are selected
//TODO: reset when deselected
@Component({
    selector: 'tw-default-table',
    templateUrl: './tw-table.component.html',
    standalone: true,
    imports: [
        CommonModule,
        AdkSelection,
        AdkTooltipDirective,
        AdkExpansionPanelComponent,
        AsyncPipe,
        TwTypographyComponent,
        CheckboxComponent,
        SortableIconComponent,
        FieldComponent,
    ],
    hostDirectives: [AdkFormGroup],
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
export class TwDefaultTableComponent implements OnChanges, OnDestroy {
    #formGroup = inject(AdkFormGroup, { self: true });
    @ViewChild('selection', { static: true }) selection: any;
    @Input() isSelectable = false;
    @Input() hasFields = false;
    @Input() isSortable = false;
    @Input() isDraggable = false;
    @Input() headers: string[] = [];
    @Input() actionColName?: string;
    @Input() actionButton?: TemplateRef<any> | string;
    @Input() rows: RowData[] = [];
    @Input() groupBy = '';
    @Input() isPaginationAction?: boolean;
    @Input() isActionChange?: boolean;

    @Output() selectedRowsEmit = new EventEmitter<RowData[]>();
    @Output() actionButtonSelectionEmit = new EventEmitter<any | any[]>();
    @Output() buttonClickEmit = new EventEmitter();

    get formGroup() {
        return this.#formGroup.formGroup();
    }

    tdss: TableDataSourceService = inject(TableDataSourceService);
    datasource = this.tdss.get('dataSource');
    groupData = new ImperativeObservable<{ [key: string]: RowData[] }>({ key: this.tdss.get('dataSource') });
    selectedRow = new ImperativeObservable<RowData | null>(null);
    selectedIndex = new ImperativeObservable<number>(this.tdss.get('draggedColIndex') ?? 0);

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['headers']) this.tdss.setHeaders(changes['headers'].currentValue);
        if (changes['rows']) this.tdss.setTableDataSource(changes['rows'].currentValue);
        if (changes['isActionChange']) {
            if (!changes['isActionChange'].firstChange) {
                this.headers = this.tdss.get('headers');
                this.rows = this.tdss.get('dataSource');
            }
        }
        if (changes['isPaginationAction'])
            this.groupData.value = this.groupByData(this.tdss.get('dataSource'), this.tdss.get('preferences').groupBy ?? '');
        if (changes['isSelectable']) this.isSelectable = changes['isSelectable'].currentValue;
        if (changes['hasFields']) this.hasFields = changes['hasFields'].currentValue;
        if (changes['isSortable']) this.isSortable = changes['isSortable'].currentValue;
        if (changes['isDraggable']) this.isDraggable = changes['isDraggable'].currentValue;
        if (changes['groupBy']) this.tdss.setGroupBy(changes['groupBy'].currentValue);
        this.updateGroupData();
        this.sortRows('');
    }

    ngOnDestroy(): void {
        this.tdss.clear();
    }

    cellMultiSelector(index: number | string, value: string[]): Observable<Field> {
        const field = new ImperativeObservable<Field>(cellSelector(index, value));
        return field.change$;
    }

    isCellValArray(value: string | []) {
        return Array.isArray(value);
    }

    isCellFieldObject(value: Field | any) {
        if (typeof value === 'object') return true;
        return false;
    }

    mapSelectedRows() {
        return {
            selectedRows: this.tdss.get('selectedRows'),
            formGroupValues: this.formGroup.value,
        };
    }

    private updateGroupData(): void {
        const groupByVar = this.tdss.get('preferences').groupBy;
        const groupData =
            groupByVar && groupByVar !== ''
                ? this.groupByData(this.tdss.get('dataSource'), groupByVar)
                : ({ key: this.tdss.get('dataSource') } as { [key: string]: RowData[] });
        this.groupData.value = { ...groupData };
    }

    objectKeysGroupData(obj: any): any {
        return Object.keys(obj);
    }

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

    isSelected(row: RowData): boolean {
        const selectedRowStr = JSON.stringify(this.selectedRow.value);
        const rowStr = JSON.stringify(row);
        return selectedRowStr === rowStr;
    }

    get allRowsSelected(): boolean {
        const dataSource = this.tdss.get('dataSource');
        const selectedRows = this.tdss.get('selectedRows');
        return dataSource.length > 0 && selectedRows.length === dataSource.length;
    }

    /**
     * isSelectable actions
     * @param event
     * @param groupKey
     */
    toggleSelectAll(event: Event, groupKey: string): void {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            this.tdss.toggleSelectedAllRows();
            this.groupData.value[groupKey].forEach((item) => this.selection.select(item));
        } else {
            this.tdss.toggleSelectedAllRows();
            this.selection.clear();
        }
        this.emitSelectedRows();
    }

    toggleSelectItem(row: object): void {
        const itemStr = JSON.stringify(row);
        if (this.selection.selected(itemStr)) {
            this.selection.deselect(itemStr);
        } else {
            this.selection.select(itemStr);
        }
        this.tdss.setSelectedRows(row);
        this.emitSelectedRows();
    }

    sortRows(key: string): void {
        const currentDirection = this.tdss.get('sortDataSource').direction;
        const newDirection: 'ascending' | 'descending' = currentDirection === 'ascending' ? 'descending' : 'ascending';
        this.tdss.sortDataSource({ key, direction: newDirection });
        this.updateGroupData();
    }
    /**
     *  Drag and Drop Handlers
     * @param index
     */
    handleDragStart(index: number): void {
        this.tdss.dragStart(index);
    }

    handleDragOver(event: DragEvent): void {
        event.preventDefault();
    }

    handleDrop(index: number, event: DragEvent): void {
        event.preventDefault();
        this.tdss.dragDrop(index);
        this.headers = this.tdss.get('headers');
        this.groupData.value = this.groupByData(this.tdss.get('dataSource'), this.groupBy);
    }

    actionButtonClicked() {
        this.actionButtonSelectionEmit.emit(this.mapSelectedRows());
    }

    emitSelectedRows(): void {
        this.selectedRowsEmit.emit(this.tdss.get('selectedRows'));
    }
}
