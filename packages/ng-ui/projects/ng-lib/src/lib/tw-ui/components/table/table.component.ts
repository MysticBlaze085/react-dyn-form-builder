import { AdkFieldList, AdkFormGroup, AdkSelection } from '../../../directives';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Field, FieldsComponent, RowData } from '../../../tw-form-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortableIconComponent, cellSelector, paginationSelector } from './utils';

import { AdkExpansionPanelComponent } from '../expansion-panel.component';
import { AdkTable } from './directives/table';
import { AdkTooltipDirective } from '../../../directives/tooltip';
import { ButtonComponent } from '../button.component';
import { CheckboxComponent } from '../../../tw-form-ui/components/types/checkbox.component';
import { FieldComponent } from '../../../tw-form-ui/components/field.component';
import { ImperativeObservable } from '../../../utils';
import { Observable } from 'rxjs';
import { SelectComponent } from '../../../tw-form-ui/components/types/select.component';
import { SettingCriteria } from './models';
import { TwCardComponent } from '../card/tw-card.component';
import { TwTableSettingsDialogComponent } from './tw-table-settings-dialog.component';
import { TwTypographyComponent } from '../typography.component';
import { searchColumnSelector } from './fields.controls';

const imports = [
    CommonModule,
    ReactiveFormsModule,
    AdkSelection,
    AdkTooltipDirective,
    AdkExpansionPanelComponent,
    AsyncPipe,
    TwTypographyComponent,
    TwCardComponent,
    CheckboxComponent,
    SortableIconComponent,
    FieldsComponent,
    FieldComponent,
    AdkTable,
    FormsModule,
    ButtonComponent,
    TwTableSettingsDialogComponent,
    SelectComponent,
];

@Component({
    selector: 'tw-table',
    standalone: true,
    imports: [...imports],
    hostDirectives: [AdkTable, AdkFormGroup, AdkFieldList],
    templateUrl: './table.component.html',
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
            .table-wrapper {
                width: 100%;
                overflow-x: auto;
            }
            .material-symbols-outlined {
                font-size: 16px !important;
            }
        `,
    ],
})
export class TableComponent implements OnInit {
    #formGroup = inject(AdkFormGroup, { self: true });
    #adkFields = inject(AdkFieldList, { self: true });
    adkTable = inject(AdkTable);

    @Input() isWrapped = false;
    @Input() set data(value: RowData[]) {
        this.adkTable.initialData = value;
    }
    @Input() columns: string[] = [];
    @Input() isDraggable = false;
    @Input() isSelectable = false;
    @Input() isSortable = false;
    @Input() isSearchable = false;
    @Input() isActionButton = false;
    @Input() isMultiSelectField = false;
    @Input() actionColName?: string;
    @Input() actionButtons: {
        icon?: string;
        label: string;
        color: 'primary' | 'secondary' | 'success' | 'warn' | 'danger';
        onClick: (rowData: any) => void;
    }[] = [];
    @Input() tableHeader!: { title: string; subtitle: string; isSearchable: boolean; buttons: any[] };
    @Output() rowClickedData = new EventEmitter<RowData>();

    get formGroup() {
        return this.#formGroup.formGroup();
    }

    rowFocus = new ImperativeObservable<RowData | null>(null);
    expandedGroups: { [key: string]: boolean } = {};
    itemsPerPage = 5;
    field = new ImperativeObservable<Field | undefined>(undefined);
    paginationField = paginationSelector;

    ngOnInit(): void {
        this.field.value = this.setField(this.adkTable.headers()[0]);
        this.#formGroup.setFormGroup([this.field.value]);
        this.formValueChanges();
        this.adkTable.setItemsPerPage(this.itemsPerPage);
        this.adkTable.setColumns(this.columns);

        console.log('TableComponent initialized', this.#adkFields.fields(), this.#formGroup.formGroup());
    }

    onItemsPerPageChange() {
        this.adkTable.setItemsPerPage(this.itemsPerPage);
    }

    isSelected(row: string): boolean {
        const parseIfString = (item: any) => {
            if (typeof item === 'string') {
                try {
                    return JSON.parse(item);
                } catch (error) {
                    console.error('Error parsing:', error);
                    return null;
                }
            }
            return item;
        };

        const parsedRow = parseIfString(row);
        if (!parsedRow) return false;

        const selectedRows = this.adkTable.selectedRowsData().map(parseIfString).filter(Boolean);

        return selectedRows.some((selectedRow) => {
            return Object.keys(parsedRow).every((key) => parsedRow[key] === selectedRow[key]);
        });
    }

    setRowFocus(rowData: RowData) {
        const { filteredData, headers } = this.adkTable.state();

        const rowDataIndex = filteredData.findIndex((data) => {
            return headers.every((key) => data[key] === rowData[key]);
        });
        this.rowFocus.value = rowData;

        if (rowDataIndex === -1) {
            console.error('No matching row found in filteredData');
            this.rowClickedData.emit(rowData);
        } else {
            try {
                this.rowClickedData.emit(filteredData[rowDataIndex]);
            } catch (error) {
                console.error('Error emitting row clicked data:', error);
                this.rowClickedData.emit(rowData);
            }
        }
    }

    isCellValArray(value: string | []) {
        return Array.isArray(value);
    }

    isCellFieldObject(value: Field | any) {
        console.log('isCellFieldObject', value);
        if (typeof value === 'object') return true;
        return false;
    }

    onDragDrop(index: number) {
        this.adkTable.dragDrop(index);
        this.columns = this.adkTable.headers();
    }

    setSettingsCriteria(criteria: SettingCriteria) {
        this.adkTable.setGroupBy(criteria.groupByColumn);
        this.adkTable.setColumns(criteria.visibleColumns);
        this.columns = criteria.visibleColumns;
        if (criteria.column) this.adkTable.applyFilter({ column: criteria.column, value: '' });
        this.field.value = this.setField(criteria.column);
        this.#formGroup.setFormGroup([this.field.value]);
        this.formValueChanges();
    }

    setField(column: string | undefined): Field {
        this.resetField();
        setTimeout(() => {
            console.info('Timed column value update');
        }, 1000);
        return searchColumnSelector(column ?? '');
    }

    formValueChanges() {
        this.formGroup.valueChanges.subscribe((e) => {
            this.adkTable.filterColumns(e['searchColumn']);
        });
    }

    cellMultiSelector(index: number | string, value: string[]): Observable<Field> {
        const field = new ImperativeObservable<Field>(cellSelector(index, value));
        this.#adkFields.add(field.value);
        return field.change$;
    }

    mapSelectedRows() {
        const dataOutput = {
            selectedRows: this.adkTable.selectedRowsData(),
            formGroupValues: this.formGroup.value,
        };
        console.log('data output', dataOutput);
        return {
            selectedRows: this.adkTable.selectedRowsData(),
            formGroupValues: this.formGroup.value,
        };
    }

    private resetField(): void {
        this.field.value = undefined;
    }
}
