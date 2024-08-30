import { AdkFormGroup, AdkSelection } from '../../../../directives';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Field, FieldsComponent, RowData } from '../../../../tw-form-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdkExpansionPanelComponent } from '../../expansion-panel.component';
import { AdkTable } from '../directives/table';
import { AdkTooltipDirective } from '../../../../directives/tooltip';
import { ButtonComponent } from '../../button.component';
import { CheckboxComponent } from 'projects/ng-lib/src/public-api';
import { ImperativeObservable } from '../../../../utils';
import { SettingCriteria } from '../models';
import { SortableIconComponent } from '../utils';
import { TableHeaderComponent } from './table-header.component';
import { TwCardComponent } from '../../card/tw-card.component';
import { TwTableSettingsDialogComponent } from './tw-table-settings-dialog.component';
import { TwTypographyComponent } from '../../typography.component';
import { searchColumnSelector } from './fields.controls';

const imports = [
    CommonModule,
    ReactiveFormsModule,
    AdkSelection,
    AdkTooltipDirective,
    AdkExpansionPanelComponent,
    AsyncPipe,
    TableHeaderComponent,
    TwTypographyComponent,
    TwCardComponent,
    CheckboxComponent,
    SortableIconComponent,
    FieldsComponent,
    AdkTable,
    FormsModule,
    ButtonComponent,
    TwTableSettingsDialogComponent,
];

@Component({
    selector: 'tw-table',
    standalone: true,
    imports: [...imports],
    hostDirectives: [AdkTable, AdkFormGroup],
    templateUrl: './table.component.html',
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
            .material-symbols-outlined {
                font-size: 16px !important;
            }
        `,
    ],
})
export class TableComponent implements OnInit {
    #formGroup = inject(AdkFormGroup, { self: true });
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
    @Input() actionColName: string = 'Actions';
    @Input() actionButtons: { icon?: string; label: string; color: string; onClick: (rowData: any) => void }[] = [];
    @Input() tableHeader!: { title: string; subtitle: string; isSearchable: boolean; buttons: any[] };

    get formGroup() {
        return this.#formGroup.formGroup();
    }

    rowFocus = new ImperativeObservable<RowData | null>(null);

    expandedGroups: { [key: string]: boolean } = {};
    itemsPerPage: number = 10;

    field = new ImperativeObservable<Field | undefined>(undefined);

    ngOnInit(): void {
        this.field.value = this.setField(this.adkTable.headers()[0]);
        this.#formGroup.setFormGroup([this.field.value]);
        console.log('ngOnInit form', this.adkTable.headers()[0], this.data, this.adkTable.state(), this.formGroup.value);
        this.onFormValueChanges();
    }

    onRowClick(rowData: any) {
        console.log('Row clicked:', rowData);
    }

    onItemsPerPageChange() {
        this.adkTable.setItemsPerPage(this.itemsPerPage);
    }

    isSelected(row: RowData): boolean {
        const rowStr = JSON.stringify(row);
        return this.adkTable.selectedRowsData().includes(rowStr);
    }

    isRowFocused(row: RowData): boolean {
        const selectedRowStr = JSON.stringify(this.rowFocus.value);
        const rowStr = JSON.stringify(row);
        return selectedRowStr === rowStr;
    }

    isCellValArray(value: string | []) {
        return Array.isArray(value);
    }

    isCellFieldObject(value: Field | any) {
        if (typeof value === 'object') return true;
        return false;
    }

    onDragDrop(index: number) {
        this.adkTable.dragDrop(index);
        this.columns = this.adkTable.headers();
    }

    onSettingsCriteria(event: SettingCriteria) {
        console.log('onSettingCriteria', event);
        this.adkTable.setGroupBy(event.groupByColumn);
        this.adkTable.setColumns(event.visibleColumns);
        this.columns = event.visibleColumns;
        if (event.column) this.adkTable.applyFilter({ column: event.column, value: '' });
        this.field.value = this.setField(event.column);
        this.#formGroup.setFormGroup([this.field.value]);
        this.onFormValueChanges();
        console.log('onSettingCriteria after', this.adkTable.state(), this.field.value);
    }

    setField(column: string | undefined): Field {
        this.resetField();
        setTimeout(() => {
            console.info('Timed column value update');
        }, 1000);
        return searchColumnSelector(column ?? '');
    }

    onFormValueChanges() {
        this.formGroup.valueChanges.subscribe((e) => {
            this.adkTable.filterColumns(e['searchColumn']);
        });
    }

    private resetField(): void {
        this.field.value = undefined;
    }
}
