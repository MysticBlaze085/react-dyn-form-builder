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
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { ITableHeaderControlModel, TABLE_CELL_ENUMS } from '../../models';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TableFinder, TableSeeker } from '../../utils/table-finder.util';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { CmlToTitleCasePipe } from '@core/shared/pipes/cmlToTitleCase.pipe';
import { FGControlBuilderHelper } from '@core/shared/modules/dyn-form-control/api/helpers';
import { FieldControlModel } from '@core/shared/modules/dyn-form-control/components/field/api';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { TableBaseFilterInputs } from './table-base.inputs';
import { isEqual } from 'lodash';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lyn-table-base',
  template: ``,
})
export class TableBaseComponent implements AfterViewInit, OnChanges, OnDestroy {
  /**
   * DataSource sets mat table data source allowing material features
   */
  public dataSource: MatTableDataSource<unknown> = new MatTableDataSource();
  public dataSource$ = new BehaviorSubject<unknown>(null);
  public paginator!: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }
  @ViewChildren('matRow', { read: ViewContainerRef })
  rows!: QueryList<ViewContainerRef>;
  public selectedRowItems = new SelectionModel<any>(true, []);
  @Input() initialSelectionName!: string;
  /**
   * Searching data ghost display
   */
  @Input() public isSearching: boolean = true;
  /**
   * Footer Display
   */
  @Input() public showFooter: boolean = false;
  /**
   * Set max table height
   */
  @Input() public maxTableHeight: string = '100%';
  /**
   * Table header display configuration array
   */
  @Input() public tableHeaders: ITableHeaderControlModel[] = [];
  /**
   * Data to display within table
   */
  @Input() public data: any[] = [];
  /**
   * Choose a column to filter by
   */
  @Input() public filterBy!: string;
  /**
   * Text to find text value
   */
  @Input() public findText!: string;
  /**
   * Search Column for findText
   */
  @Input() public findTextColumn: string = 'message';
  /**
   * Controls wether pagination shows or not
   */
  @Input() public showPagination: boolean = false;
  /**
   * Display page size options count
   */
  @Input() public pageSizeOptions: number[] = [5, 10, 25, 100, 500, 1000];
  /**
   * Override filter placeholder name
   */
  @Input() public isFormFilterLabel!: string;
  /**
   * Default Page Size
   */
  @Input() public defaultPageSize: number = 25;
  /**
   * No records found message
   */
  @Input() public noRecordsFoundMessage: string = 'No records found';
  /**
   * Cell value outputs row data object
   */
  @Output() public rowValue = new EventEmitter();
  /**
   * Text to find output a true or false
   */
  @Output() public textToFindAction: EventEmitter<boolean> = new EventEmitter<boolean>();
  /**
   * Dual row click action
   */
  @Output() public dualRowValue: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Input controls
   */
  public formInputs: FieldControlModel = TableBaseFilterInputs('name', false);
  /**
   * Form group filter reactive form
   */
  public formGroup: UntypedFormGroup = new FGControlBuilderHelper([this.formInputs]).formGroup;
  /**
   * Find text value
   */
  public textToFindControl: UntypedFormControl = new UntypedFormControl('');
  /**
   * String array applied within table
   */
  public displayedColumns: string[] = [];
  /**
   * Table cell type values
   */
  public tableCellEnums = TABLE_CELL_ENUMS;
  /**
   * Placeholder display for filter input
   */
  public filterPlaceholder: string = 'Filter';
  /**
   * Track firstChanges
   */
  public isFirstChange: boolean = false;
  /**
   * MatPaginator Output
   */
  public pageEvent!: PageEvent;
  public length: number = this.data.length + 1;
  public selection = new SelectionModel<any>(false, []);
  public selectedEventId = '';
  public pendingSeek: any | null = null;
  public firstChange: boolean = true;

  constructor(public changeDetectorRef: ChangeDetectorRef) {}

  public ngAfterViewInit() {
    this.isSearching = false;
  }

  public ngOnChanges({ isSearching, showPagination, tableHeaders, data, filterBy, findText, isFormFilterLabel }: SimpleChanges) {
    this.isFirstChange = false;
    if (showPagination) this.showPagination = showPagination.currentValue;
    if (isSearching) this.isSearching = isSearching.currentValue;
    if (tableHeaders?.currentValue) {
      this.isFirstChange = tableHeaders.firstChange;
      this.tableHeaders = tableHeaders.currentValue;
      this.displayedColumns = tableHeaders.currentValue
        .filter((headers: ITableHeaderControlModel) => !headers.hidden)
        .map((headers: ITableHeaderControlModel) => headers.headerName)
        .filter((item: any, idx: any, arr: any) => arr.indexOf(item) == idx);
    }
    if (data?.currentValue && !isEqual(data.previousValue, data.currentValue)) this.setDataSourceData(data.currentValue);
    if (isFormFilterLabel?.currentValue) this.isFormFilterLabel = isFormFilterLabel.currentValue;
    if (filterBy?.currentValue) {
      this.filterBy = filterBy.currentValue;
      this.setFilterByColumn(filterBy.currentValue);
      this.formInputs = TableBaseFilterInputs(new CmlToTitleCasePipe().transform(this.isFormFilterLabel ?? filterBy.currentValue), false);
    }
    if (findText?.currentValue) this.findText = findText.currentValue;
  }
  /**
   * Destroy subscriptions
   */
  public ngOnDestroy() {
    this.dataSource$.unsubscribe();
  }
  /**
   * Set dataSource table
   */
  public setDataSourceData(data: any[]) {
    this.data = data;
    this.dataSource$.next(data);
  }
  public setInitialSelection(headerName: string, data: any[]) {
    // Set initial selection
    data.forEach((row) => {
      if (row[headerName]) {
        this.selectedRowItems.select(row);
      }
    });
  }
  /**
   * Hidden button method outputs false if undefined and cell values output value
   */
  public hiddenButton(cellValue: any): boolean {
    if (!cellValue) {
      return false;
    }
    return cellValue;
  }
  /**
   * Outputs row object to parent component
   */
  public cellClick(rowValue: any) {
    this.selection.toggle(rowValue);
    this.rowValue.emit(rowValue);
  }
  /**
   *  Open link in new tab
   */
  public openLink(url: string): void {
    window.open(url, '_blank');
  }
  /**
   * Dual row value
   */
  public dualClick(rowValue: any) {
    this.selection.toggle(rowValue);
    this.dualRowValue.emit(rowValue);
  }
  /**
   * Filters values from dataSource
   */
  public filterValueChanges(event: { [key: string]: string }) {
    const eventNotNull = event.filter ? event.filter : '';
    this.formGroup.patchValue({ filter: eventNotNull });
    const filterValue = eventNotNull;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /**
   * Output text directions
   */
  public searchTextDirection(searchForward: boolean) {
    this.textToFindAction.emit(searchForward);
  }
  /**
   * Find text values by value using previous or next actions
   */
  public findTextDirection(searchForward: boolean): void {
    const findTextValue = this.findText ?? this.textToFindControl.value;
    const extractMessage: any = (testVal: any) => {
      return testVal[this.findTextColumn];
    };

    const tableFinder = new TableFinder(this.selection, this.dataSource, extractMessage);
    const nextIndex = tableFinder.find(findTextValue, searchForward);

    if (nextIndex !== -1) {
      const tableSeeker = new TableSeeker(this.selection, this.dataSource, this.paginator, this.rows);
      const seekResult = tableSeeker.seek(nextIndex);
      if (seekResult.postAction !== undefined) {
        this.pendingSeek = seekResult;
      } else {
        this.pendingSeek = null;
      }
      seekResult.nowAction();
    }
  }
  /**
   * Set filter placeholder value
   * Sets filter by column name value
   */
  public setFilterByColumn(column: string) {
    this.dataSource.filterPredicate = (data: any, filter) => {
      return data[column] && typeof data[column] === 'string' ? data[column].toLowerCase().includes(filter) : '';
    };
  }
}
