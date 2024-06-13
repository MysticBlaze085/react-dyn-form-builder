/* eslint-disable @typescript-eslint/no-useless-constructor */

import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { CmlToTitleCasePipe } from '@core/shared/pipes/cmlToTitleCase.pipe';
import { Group } from './lyn-table/api';
import { ITableHeaderControlModel } from '@core/shared/modules/dyn-table/models';
import { PageEvent } from '@angular/material/paginator';
import { TableBaseComponent } from './table-base.component';
import { distinct } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lyn-group-by-table',
  template: ``,
})
export class GroupByTableComponent extends TableBaseComponent implements OnChanges, AfterViewInit, OnDestroy {
  /**
   * Table control variables
   */
  public _allData: { [key: string]: any }[] = [];
  public groupByColumns: string[] = [];

  constructor(public changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  public ngAfterViewInit() {
    super.ngAfterViewInit();
    this.dataSource$.pipe(distinct()).subscribe((data: any) => {
      this.dataSource.paginator = this.paginator;
      if (this.paginator?.page) {
        this.paginator.page.subscribe((_: PageEvent) => {
          if (this.pendingSeek) {
            this.pendingSeek.postAction();
            this.pendingSeek = null;
          }
        });
      }
      this.setDataSource(data);
      this.changeDetectorRef.detectChanges();
    });
  }

  public ngOnChanges({ tableHeaders, data, filterBy }: SimpleChanges): void {
    super.ngOnChanges({ tableHeaders, data, filterBy });
    if (tableHeaders?.currentValue) {
      this.groupByColumns = tableHeaders.currentValue
        .filter((headers: ITableHeaderControlModel) => !headers.hidden)
        .filter((table: ITableHeaderControlModel) => table.displayGroupByFilter)
        .map((table: ITableHeaderControlModel) => table.headerName);
    }
    if (data?.currentValue && data.currentValue.length) {
      const mapData = data.currentValue.map((item: any, index: number) => {
        const newObj = { ...item, index: index + 1 };
        return Object.preventExtensions(newObj);
      });
      this.data = mapData;
      this._allData = mapData;
      this.dataSource$.next(mapData);
    }
    if (filterBy?.currentValue) {
      this.filterBy = filterBy.currentValue;
    }
  }
  public ngOnDestroy() {
    super.ngOnDestroy();
  }
  /**
   * Filters values from dataSource
   */
  public filterGroupValueChanges(event: { [key: string]: string }) {
    const eventNotNull = event.filter ? event.filter : '';
    this.formGroup.patchValue({ filter: eventNotNull });
    const groupFiltering = this.tableHeaders.find((header) => header.displayGroupByFilter);
    this.searchData(!!groupFiltering?.displayGroupByFilter, this.formGroup.value['filter']);
    if (this.initialSelectionName) this.setInitialSelection(this.initialSelectionName, this.dataSource.data);
  }
  /**
   * Check Search Type
   */
  private searchData(displayGroupByFilter: boolean, searchValueParam: string) {
    const searchValue: string = searchValueParam.toLowerCase();

    if (this.filterBy)
      if (displayGroupByFilter) {
        this.searchGroupData(searchValue);
      } else {
        this.searchBaseData(searchValue);
      }
  }
  /**
   * Search through group
   */
  private searchGroupData(searchValueParam: string) {
    let searchValue: string = searchValueParam.toLowerCase();
    let dataFilter = this._allData;

    searchValue = this.handleCellParamValue(searchValueParam);

    dataFilter = dataFilter.filter((data) => {
      return data[this.filterBy].toLowerCase().startsWith(searchValue.slice(0, Math.max(data[this.filterBy].length - 1, 1)));
    });

    if (searchValue) {
      this.setDataSource(dataFilter);
    } else {
      this.setDataSource(this._allData);
    }
  }
  /**
   * Search Flat data when grouping exists on another table
   */
  private searchBaseData(searchValueParam: string) {
    let searchValue: string = searchValueParam.toLowerCase();
    searchValue = this.handleCellParamValue(searchValueParam);
    let dataFilter = this.data;

    dataFilter = dataFilter.filter((data: any) => {
      return data[this.filterBy].toLowerCase().includes(searchValue);
    });

    this.dataSource.data = dataFilter;
  }
  /**
   * Handle check for cellParamValue
   */
  private handleCellParamValue(searchValueParam: string): string {
    let searchValue: string = searchValueParam.toLowerCase();
    const header = this.tableHeaders.find((headerValue) => headerValue.headerName === this.filterBy && headerValue.cellParamValue);
    if (header?.cellParamValue) {
      searchValue = this.searchCellParam(searchValue);

      if (!searchValue && !!searchValueParam) {
        searchValue = searchValueParam.trim().toLowerCase();
      }
    }
    return searchValue;
  }
  /**
   * Search cellParamValue
   */
  private searchCellParam(searchValue: string): string {
    const header = this.tableHeaders.find((headerValue) => headerValue.headerName === this.filterBy && headerValue.cellParamValue);
    let dataFilterByValues = this._allData;

    if (this.filterBy) {
      dataFilterByValues =
        dataFilterByValues.length && searchValue
          ? dataFilterByValues
              .map((dataValue: any) => {
                let isMatch = undefined;
                if (header?.cellParamValue) {
                  isMatch = header?.cellParamValue(dataValue[this.filterBy]).toLowerCase().includes(searchValue)
                    ? dataValue[this.filterBy].toLowerCase()
                    : undefined;
                }
                return isMatch;
              })
              .filter((val) => !!val)
          : [];
    }
    return dataFilterByValues.length ? [...new Set(dataFilterByValues)].join('') : '';
  }
  /**
   * Displays Group by filter value
   * @param groupHeaderName
   * @param group
   * @returns
   */
  public displayGroupTitle(groupHeaderName: string, group: Group | any): string {
    const tableHeader = this.tableHeaders.find((table: ITableHeaderControlModel) => table.headerName === groupHeaderName);
    if (tableHeader?.setHeaderName && tableHeader.cellParamValue) {
      return `${tableHeader.cellParamValue(group[groupHeaderName])} (${group.totalCounts})`;
    } else if (tableHeader?.setHeaderName && !tableHeader.cellParamValue) {
      return `${group[groupHeaderName]} (${group.totalCounts})`;
    }
    return `${new CmlToTitleCasePipe().transform(groupHeaderName)} (${group.totalCounts})`;
  }
  /**
   * Sets expand value on a row
   */
  public groupHeaderClick(row: any) {
    row.expanded = !row.expanded;
    this.dataSource.filter = performance.now().toString();
  }
  /**
   * Sets group by values
   */
  public groupBy(event: any, column: string) {
    event.stopPropagation();
    this.checkGroupByColumn(column, true);
    this.setDataSource(this._allData);
  }
  /**
   * UnGroup Action event trigger
   */
  public unGroupBy(event: Event, column: string) {
    event.stopPropagation();
    this.checkGroupByColumn(column, false);
    this.setDataSource(this._allData);
  }
  public isGroup(_index: number, item: any): boolean {
    return item.level;
  }
  /**
   * Sets data table data source
   * @param dataFilter
   */
  private setDataSource(dataFilter: any[]) {
    this.dataSource.data = this.addGroups(dataFilter, this.groupByColumns);
    this.length = this._allData.length;
    // Checks if a data object matches the data source's filter string. Is being overridden for a custom implementation of filter matching.
    this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
    // understanding performance.now https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
    this.dataSource.filter = performance.now().toString();
  }
  /**
   * Checks group by column
   */
  private checkGroupByColumn(field: string, add: boolean) {
    let found = null;
    for (const column of this.groupByColumns) {
      if (column === field) {
        found = this.groupByColumns.indexOf(column, 0);
      }
    }
    if (found != null && found >= 0) {
      if (!add) {
        this.groupByColumns.splice(found, 1);
      }
    } else {
      if (add) {
        this.groupByColumns.push(field);
      }
    }
  }
  /**
   *  below is for grid row grouping
   */
  private customFilterPredicate(data: any | Group, _filter: string): boolean {
    return data instanceof Group ? data.visible : this.getDataRowVisible(data);
  }
  /**
   * Sets raw data allows for groupBy to reset when grouping and reversing grouping
   */
  private getDataRowVisible(data: any): boolean {
    const groupRows = this.dataSource.data.filter((row: Group | any) => {
      if (!(row instanceof Group)) {
        return false;
      }
      let match = true;
      const notGroupRow = row as any;
      this.groupByColumns.forEach((column: any) => {
        if (!notGroupRow[column] || !data[column] || notGroupRow[column] !== data[column]) {
          match = false;
        }
      });
      return match;
    });
    if (groupRows.length === 0) {
      return true;
    }
    const parent = groupRows[0] as Group;
    return parent.visible && parent.expanded;
  }
  /**
   * Adds group object
   */
  private addGroups(data: any[], groupByColumns: string[]): any[] {
    const rootGroup = new Group();
    rootGroup.expanded = true;
    return this.getSublevel(data, 0, groupByColumns, rootGroup);
  }
  /**
   * Sets sublevel group
   */
  private getSublevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }

    const mapData = data.map((row) => {
      const result = new Group() as any;
      result.level = level + 1;
      result.parent = parent;

      for (let i = 0; i <= level; i++) {
        result[groupByColumns[i]] = row[groupByColumns[i]];
      }
      return result;
    });

    const groups = this.uniqueBy(mapData, JSON.stringify);
    const currentColumn = groupByColumns[level];
    let subGroups: any[] = [];
    groups.forEach((group) => {
      const rowsInGroup = data.filter((row) => group[currentColumn] === row[currentColumn]);
      group.totalCounts = rowsInGroup.length;
      const subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
      subGroup.unshift(group);
      subGroups = subGroups.concat(subGroup);
    });
    return subGroups;
  }
  /**
   * checks if object is unique by key object
   */
  private uniqueBy(a: any[], key: any) {
    const seen: any = {};
    return a.filter((item) => {
      const k = key(item) as string;
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }
}
