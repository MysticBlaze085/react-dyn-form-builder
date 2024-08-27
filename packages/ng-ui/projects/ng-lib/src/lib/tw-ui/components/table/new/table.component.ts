import { AdkFormGroup, AdkSelection } from '../../../../directives';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Field, RowData } from '../../../../tw-form-ui';

import { AdkExpansionPanelComponent } from '../../expansion-panel.component';
import { AdkTable } from '../directives/table';
import { AdkTooltipDirective } from '../../../../directives/tooltip';
import { ButtonComponent } from '../../button.component';
import { CheckboxComponent } from 'projects/ng-lib/src/public-api';
import { FieldComponent } from '../../../../tw-form-ui/components/field.component';
import { FormsModule } from '@angular/forms';
import { ImperativeObservable } from '../../../../utils';
import { SortableIconComponent } from '../utils';
import { TableHeaderComponent } from './table-header.component';
import { TwCardComponent } from '../../card/tw-card.component';
import { TwTypographyComponent } from '../../typography.component';

const imports = [
    CommonModule,
    AdkSelection,
    AdkTooltipDirective,
    AdkExpansionPanelComponent,
    AsyncPipe,
    TableHeaderComponent,
    TwTypographyComponent,
    TwCardComponent,
    CheckboxComponent,
    SortableIconComponent,
    FieldComponent,
    AdkTable,
    FormsModule,
    ButtonComponent,
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
    @Input() tableHeader!: { title: string; subtitle: string; isSearchable: boolean; buttons: any[] };

    get formGroup() {
        return this.#formGroup.formGroup();
    }

    rowFocus = new ImperativeObservable<RowData | null>(null);

    groupByColumn: string = '';
    expandedGroups: { [key: string]: boolean } = {};
    itemsPerPage: number = 10;

    filterColumn: string = '';
    filterValue: string = '';

    searchColumn = new ImperativeObservable<string | null>('');
    field = new ImperativeObservable<Field | undefined>(undefined);

    ngOnInit(): void {
        console.log('ngOnInit', this.data, this.adkTable.state());
    }

    onFilterColumnChange(column: string) {
        this.filterColumn = column;
        this.applyFilter();
    }

    applyFilter() {
        this.adkTable.applyFilter({ column: this.filterColumn, value: this.filterValue });
    }

    toggleGroup(key: string) {
        this.expandedGroups[key] = !this.expandedGroups[key];
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
}
