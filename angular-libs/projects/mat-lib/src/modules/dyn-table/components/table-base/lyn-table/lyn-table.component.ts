/* eslint-disable @typescript-eslint/restrict-plus-operands */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TableBaseFilterInputs, TableColumnFilterInput } from '../table-base.inputs';

import { CmlToTitleCasePipe } from '@core/shared/pipes/cmlToTitleCase.pipe';
import { DropdownFieldControlModel } from '@core/shared/modules/dyn-form-control/components/dropdown-field/api';
import { FGControlBuilderHelper } from '@core/shared/modules/dyn-form-control/api/helpers';
import { Group } from './api';
import { GroupByTableComponent } from '../group-by-table.component';
import { MatMenu } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'lyn-table',
  templateUrl: './lyn-table.component.html',
  styleUrls: ['./lyn-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LynTableComponent extends GroupByTableComponent implements OnChanges, AfterViewInit, OnDestroy {
  /**
   * Filter menu interaction grabs child view components MatMenu events/methods
   */
  @ViewChild('filterMenu', { static: true }) filterMenu!: MatMenu;
  /**
   * Displays filter input
   */
  @Input() public isFilter: boolean = false;
  /**
   * Filter menu displays icon or row inputs
   */
  @Input() public isFilterMenu: boolean = false;
  /**
   * Filter action button display on table header
   */
  @Input() public isFilterAction: boolean = true;
  /**
   * Filter by column value
   */
  @Input() public isFilterByValue: boolean = true;
  /**
   * Displays hover color over rows
   */
  @Input() public isRowClickable: boolean = false;
  /**
   * Table grouped columns
   */
  @Input() public isTextToFind: boolean = false;
  /**
   * Multi Selection
   */
  @Input() public isMultiSelect: boolean = true;
  /**
   * Outputs selected row value list
   */
  @Output() public rowSelectionList: EventEmitter<any[]> = new EventEmitter<any[]>();

  public formColumnInput: DropdownFieldControlModel[] = [];
  public formColumnGroup!: UntypedFormGroup | undefined;

  constructor(public changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  public ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  public ngOnChanges({
    initialSelectionName,
    isSearching,
    showPagination,
    tableHeaders,
    data,
    filterBy,
    isFormFilterLabel,
    findTextColumn,
  }: SimpleChanges) {
    this.selectedRowItems = new SelectionModel<any>(this.isMultiSelect, []);
    super.ngOnChanges({ isSearching, showPagination, tableHeaders, data, filterBy, isFormFilterLabel, findTextColumn });
    if (showPagination) this.showPagination = showPagination.currentValue;
    if (isSearching) this.isSearching = isSearching.currentValue;
    if (isFormFilterLabel?.currentValue) this.isFormFilterLabel = isFormFilterLabel.currentValue;
    if (filterBy?.currentValue) {
      this.formInputs = TableBaseFilterInputs(new CmlToTitleCasePipe().transform(this.isFormFilterLabel ?? filterBy.currentValue), false);
      this.setFilterByColumn(filterBy.currentValue);
    }
    if (data?.currentValue) {
      this.length = data.currentValue.length;
      this.selectedRowItems.clear();
      this.setDataSourceData(data.currentValue);
      if (initialSelectionName?.currentValue) this.setInitialSelection(initialSelectionName.currentValue, this.data);
    } else {
      this.length = 0;
    }
  }
  public ngOnDestroy() {
    super.ngOnDestroy();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected() {
    const numSelected = this.selectedRowItems.selected.length;
    this.rowSelectionList.emit(this.selectedRowItems.selected);
    const numRows = this.dataSource.data
      .map((data) => {
        if (!(data instanceof Group)) return data;
      })
      .filter((val) => val).length;
    return numSelected === numRows;
  }
  /** Handles a single selected item */
  public handleSingleSelect(event: any, row: any) {
    if (!this.isMultiSelect) {
      if (!this.selection.isSelected(row)) {
        this.selection.clear();
      }
    }
    event.checked ? this.rowSelectionList.emit(row) : this.rowSelectionList.emit(undefined);
    this.selection.toggle(row);
  }
  /** Outputs last value of a string if has . or not */
  public getHeaderName(headerName: string): string {
    const str = headerName.split('.');
    return str[str.length - 1];
  }
  /** Header name value nested row data */
  public getCellRowValue(headerName: string, data: any) {
    const getValue = (obj: any, key: string) => {
      const keys = key.split('.');
      let value = obj;
      for (const element of keys) {
        value = value[element];
        if (!value) {
          break;
        }
      }
      return value;
    };
    return getValue(data, headerName);
  }
  /** Calculate Column Data */
  public calculateColumnData(valueSelector: string, data: any[]) {
    let sum = 0;
    for (const item of data) {
      sum += item[valueSelector] as number;
    }
    return sum;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedRowItems.clear();
      return;
    }
    this.selectedRowItems.select(
      ...this.dataSource.data
        .map((data) => {
          if (!(data instanceof Group)) return data;
        })
        .filter((val) => val)
    );
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }
  /**
   * Gets form control json from formColumnInput var,
   * Does not work with Group table display
   */
  public getFormControl(headerName: string): DropdownFieldControlModel {
    return this.formColumnInput.find((control) => control.controlName.includes(headerName)) as DropdownFieldControlModel;
  }
  /** On click actions pushes a form control with controlName matching headerName */
  public setColumnControl(headerName: string) {
    this.formColumnGroup?.reset();
    const tableData = this.data;
    const mapColumnValues = [...new Set(tableData.map((val) => val[headerName]))];

    if (!this.getFormControl(headerName)?.controlName) {
      this.formColumnInput.push(TableColumnFilterInput(headerName, mapColumnValues, false) as DropdownFieldControlModel);
    }
    this.formColumnGroup = new FGControlBuilderHelper(this.formColumnInput).formGroup;
  }
  /**
   * Individual column filtering, sets an array of none duplicate values
   * and passes to form control creating selectable options within a dropdown
   */
  public handleColumnFiltering(headerName: string, e: { [key: string]: string }) {
    const key = Object.keys(e)[0];
    let flatString = '';

    if (e[key] && typeof e[key] === 'string') flatString = e[key].toLowerCase();
    else flatString = e[key];

    this.dataSource.filterPredicate = (data: any, filter) => {
      let dataCheck;
      if (data[headerName] && typeof data[headerName] === 'string') dataCheck = data[headerName].toLowerCase().includes(filter);
      else dataCheck = data[headerName] === filter;
      return dataCheck;
    };

    this.dataSource.filter = flatString;
  }
  /** Triggers text to find interaction event emitters and method */
  public searchTextDirection(searchForward: boolean) {
    this.findTextDirection(searchForward);
  }
  /** Resets created form values to null */
  public clearColumnFilter() {
    this.formColumnGroup?.reset();
    this.dataSource.filter = '';
  }
}
