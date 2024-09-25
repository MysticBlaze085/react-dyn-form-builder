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
import { SelectionUtils } from '../../../utils/deep-compare';
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
  FormsModule,
  ButtonComponent,
  TwTableSettingsDialogComponent,
  SelectComponent,
];

// FIXME: issue when data is selected only shows the current active headers selection of data and no the whole row of information

@Component({
  selector: 'tw-table',
  standalone: true,
  // Removed hostDirectives as they are now included in imports
  imports: [...imports],
  hostDirectives: [AdkTable, AdkFormGroup],
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
      #checkAll {
        width: 52px;
      }
    `,
  ],
})
export class TableComponent implements OnInit {
  @Input() set data(value: RowData[]) {
    this.adkTable.initialData = value;
  }
  @Input() set config(value: any) {
    this._config = { ...this._config, ...value };
  }
  get config(): any {
    return this._config;
  }
  private _config: any = {};

  #filterFG = inject(AdkFormGroup, { self: true });
  #formGroup = inject(AdkFormGroup, { self: true });
  adkTable = inject(AdkTable);

  columns: string[] = [];

  @Output() rowClickedData = new EventEmitter<RowData>();
  @Output() selectedRowsEmitValue = new EventEmitter<any[]>();

  get filterFG() {
    return this.#filterFG.formGroup();
  }

  get formGroup() {
    return this.#formGroup.formGroup();
  }

  rowFocus = new ImperativeObservable<RowData | null>(null);
  expandedGroups: { [key: string]: boolean } = {};
  itemsPerPage = 5;
  field = new ImperativeObservable<Field | undefined>(undefined);
  paginationField = paginationSelector;

  ngOnInit(): void {
    this.updateTableFromConfig();
  }

  private updateTableFromConfig(): void {
    this.data = this.config.data || [];
    this.columns = this.config.columns || [];

    this.field.value = this.setField(this.adkTable.headers()[0]);
    this.#filterFG.setFormGroup([this.field.value]);
    this.formValueChanges();
    this.adkTable.setItemsPerPage(this.itemsPerPage);
    this.adkTable.setColumns(this.columns);
  }

  onItemsPerPageChange() {
    this.adkTable.setItemsPerPage(this.itemsPerPage);
  }

  isSelected(row: string | RowData | any): boolean {
    const selectedRows = this.adkTable.selectedRowsData();
    // Check if the row or any selected row is a complex object
    const isComplex = this.isComplexObject(row);
    if (!isComplex) {
      // Use deep comparison for complex objects
      return SelectionUtils.isSelected(row, selectedRows);
    } else {
      // Use stringify method for simple objects or primitives
      return SelectionUtils.isSelectedStringify(row, selectedRows);
    }
  }

  private isComplexObject(obj: any): boolean {
    let isComplex = false;
    if (typeof obj === 'object') {
      const keys = Object.keys(obj);
      keys.forEach((key) => {
        if (!isComplex)
          if (typeof obj[key] === 'object') {
            if (obj[key]['formControl']) isComplex = true;
            return;
          }
      });
    }
    return isComplex;
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
    this.#filterFG.setFormGroup([this.field.value]);
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
    this.filterFG.valueChanges.subscribe((e) => {
      this.adkTable.filterColumns(e['searchColumn']);
    });
    this.formGroup.valueChanges.subscribe((e) => {
      console.log('FormGroup Check', e);
    });
  }

  cellMultiSelector(index: number | string, value: string[]): Observable<Field> {
    const field = new ImperativeObservable<Field>(cellSelector(index, value));
    return field.change$;
  }

  mapSelectedRows() {
    return {
      selectedRows: this.adkTable.selectedRowsData(),
      formGroupValues: this.formGroup.value,
    };
  }

  private resetField(): void {
    this.field.value = undefined;
  }
}
