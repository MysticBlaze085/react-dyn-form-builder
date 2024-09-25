/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Directive, Input, computed, inject, signal } from '@angular/core';
import { FilterCriteria, TableDataSourceState } from '../models';
import { Identifiable, RowData } from '../../../../tw-form-ui';
import { PaginationCriteria, SortCriteria } from '../models/table.interface';

import { AdkSelection } from '../../../../directives';

//TODO: figure out field for search value it should change based on the column that are visible
//TODO: maybe make a preferences adk directive of itself handling the preferences interactions
@Directive({
  selector: '[adk-table]',
  exportAs: 'adkTable',
  standalone: true,
  hostDirectives: [AdkSelection],
})
export class AdkTable<T extends Identifiable> {
  #selection = inject(AdkSelection, { self: true });
  @Input() set initialData(data: T[]) {
    this.setInitialData(data);
  }

  @Input() set columns(cols: string[]) {
    this.setColumns(cols);
  }

  @Input() set groupBy(column: string) {
    this.setGroupBy(column);
  }

  @Input() set filterBy(criteria: FilterCriteria) {
    this.applyFilter(criteria);
  }

  #state = signal<TableDataSourceState>({
    dataSource: [],
    draggedColIndex: null,
    filteredData: [],
    headers: [],
    paginationCriteria: {
      currentPage: 1,
      totalPages: 1,
      pageSize: 10,
    },
    preferenceCriteria: {
      visibleColumns: [],
      groupByColumn: '',
    },
    selectedRows: [],
    sortCriteria: { key: '', direction: 'ascending' },
    filterCriteria: { column: '', value: '' },
    needsFilterSort: false,
    toggleAll: false,
  });

  // Computed signals for derived state
  readonly state = computed(() => this.#state());
  readonly headers = computed(() => this.#state().headers);
  readonly visibleData = computed(() => this.getVisibleData());
  readonly filteredCriteria = computed(() => this.getFilterCriteriaData());
  readonly currentPageData = computed(() => this.getCurrentPageData());
  readonly selectedRowsData = computed(() => this.getSelectedRowsData());
  readonly groupedData = computed(() => this.getGroupedData());
  readonly sortCriteriaData = computed(() => this.getSortCriteriaData());
  readonly paginationCriteria = computed(() => this.getPaginationCriteria());
  readonly preferenceCriteria = computed(() => this.getPreferenceCriteriaData());
  readonly isToggleAll = computed(() => this.#state().toggleAll);

  setInitialData(data: Partial<T>[]) {
    this.#state.update((state) => ({
      ...state,
      dataSource: data,
      filteredData: data,
      headers: data.length > 0 ? Object.keys(data[0]) : [],
      preferenceCriteria: {
        ...state.preferenceCriteria,
        visibleColumns: data.length > 0 ? Object.keys(data[0]) : [],
      },
      paginationCriteria: {
        ...state.paginationCriteria,
        totalPages: Math.ceil(data.length / state.paginationCriteria.pageSize),
      },
      filterCriteria: {
        column: data.length > 0 ? Object.keys(data[0])[0] : '',
        value: '',
      },
    }));
    this.updatePagination();
  }

  setColumns(columns: string[]) {
    this.#state.update((state) => ({
      ...state,
      headers: columns,
      preferenceCriteria: {
        ...state.preferenceCriteria,
        visibleColumns: columns,
      },
    }));
  }

  setGroupBy(column: string) {
    this.#state.update((state) => ({
      ...state,
      preferenceCriteria: {
        ...state.preferenceCriteria,
        groupByColumn: column,
      },
    }));
  }

  // Drag and Drop
  dragStart(index: number): void {
    this.#state.update((state) => ({ ...state, draggedColIndex: index }));
  }

  dragOver(event: DragEvent): void {
    event.preventDefault();
  }

  dragDrop(index: number): void {
    const targetIndex = index;
    const { draggedColIndex, dataSource, headers } = this.#state();

    if (draggedColIndex === null || draggedColIndex === targetIndex) return;

    // Update headers array with dragged column
    const newHeaders = [...headers];
    const draggedHeader = newHeaders.splice(draggedColIndex, 1)[0];
    newHeaders.splice(targetIndex, 0, draggedHeader);

    // Update rows in dataSource array with dragged column
    const newRows = dataSource.map((row: any) => {
      const entries = Object.entries(row);
      const draggedEntry = entries.splice(draggedColIndex, 1)[0];
      entries.splice(targetIndex, 0, draggedEntry);
      return Object.fromEntries(entries);
    });

    // Update state with new headers and rows, but don't filter or sort yet
    this.#state.update((state) => ({
      ...state,
      headers: newHeaders,
      dataSource: newRows,
      filteredData: newRows,
      draggedColIndex: null,
      needsFilterSort: true, // Flag to indicate filtering and sorting is needed
    }));

    // Defer filtering and sorting
    setTimeout(() => this.applyFilterAndSort(), 0);
    console.warn('table state:', this.#state());
  }

  private applyFilterAndSort(): void {
    const { dataSource, filterCriteria, sortCriteria, needsFilterSort } = this.#state();

    if (!needsFilterSort) return;

    // Apply filter
    const filteredData = dataSource.filter((item) =>
      String(item[filterCriteria.column]).toLowerCase().includes(filterCriteria.value.toLowerCase())
    );

    // Apply sort
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[sortCriteria.key] < b[sortCriteria.key]) return sortCriteria.direction === 'ascending' ? -1 : 1;
      if (a[sortCriteria.key] > b[sortCriteria.key]) return sortCriteria.direction === 'ascending' ? 1 : -1;
      return 0;
    });

    // Update state with filtered and sorted data
    this.#state.update((state) => ({
      ...state,
      filteredData: sortedData,
      needsFilterSort: false,
    }));
  }

  // Pagination
  private updatePagination() {
    const { dataSource, paginationCriteria } = this.#state();
    const totalPages = Math.ceil(dataSource.length / paginationCriteria.pageSize);
    this.#state.update((state) => ({
      ...state,
      paginationCriteria: {
        ...state.paginationCriteria,
        totalPages,
      },
    }));
  }

  setPage(page: number) {
    this.#state.update((state) => ({
      ...state,
      paginationCriteria: {
        ...state.paginationCriteria,
        currentPage: page,
      },
    }));
  }

  setItemsPerPage(pageSize: number | string) {
    const pageSizeNum = Number(pageSize);

    this.#state.update((state) => ({
      ...state,
      paginationCriteria: {
        ...state.paginationCriteria,
        pageSize: pageSizeNum,
        currentPage: 1,
        totalPages: Math.ceil(state.filteredData.length / pageSizeNum),
      },
    }));
    this.updatePagination();
  }

  // Sorting
  sortBy(key: string) {
    this.#state.update((state) => ({
      ...state,
      sortCriteria: {
        key,
        direction: state.sortCriteria.key === key && state.sortCriteria.direction === 'ascending' ? 'descending' : 'ascending',
      },
    }));
    this.applySort();
  }

  private applySort() {
    const { sortCriteria, filteredData } = this.#state();
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[sortCriteria.key] < b[sortCriteria.key]) return sortCriteria.direction === 'ascending' ? -1 : 1;
      if (a[sortCriteria.key] > b[sortCriteria.key]) return sortCriteria.direction === 'ascending' ? 1 : -1;
      return 0;
    });
    this.#state.update((state) => ({ ...state, filteredData: sortedData }));
  }

  // Filtering
  applyFilter(criteria: FilterCriteria) {
    this.#state.update((state) => ({ ...state, filterCriteria: criteria }));
    this.updateFilteredData();
  }

  filterColumns(search: string) {
    this.#state.update((state) => ({
      ...state,
      filterCriteria: {
        ...state.filterCriteria,
        value: search,
      },
    }));
    this.updateFilteredData();
  }

  private updateFilteredData() {
    const { dataSource, filterCriteria } = this.#state();
    const filteredData = dataSource.filter((item) =>
      String(item[filterCriteria.column]).toLowerCase().includes(filterCriteria.value.toLowerCase())
    );
    this.#state.update((state) => ({ ...state, filteredData }));
    this.updatePagination();
  }

  // Row selection
  toggleRowSelection(row: RowData) {
    const rowDataStr = JSON.stringify(row);
    if (this.#selection.selected(rowDataStr)) this.#selection.deselect(rowDataStr);
    else this.#selection.select(rowDataStr);
    this.#state.update((state) => ({
      ...state,
      selectedRows: this.#selection.items(),
    }));
  }

  toggleAllRowsSelection() {
    const { dataSource } = this.#state();
    const selectionItems = this.#selection.items();
    this.#state.update((state) => {
      const allSelected = selectionItems.length === dataSource.length;
      const hasASelection = selectionItems.length > dataSource.length && selectionItems.length !== 0;
      if (allSelected && !hasASelection) {
        this.#selection.clear();
      } else {
        this.#selection.clear();
        dataSource.forEach((item) => {
          const itemStr = JSON.stringify(item);
          this.#selection.select(itemStr);
        });
      }
      return {
        ...state,
        selectedRows: this.#selection.items(),
        toggleAll: !allSelected,
      };
    });
  }

  selected(row: RowData): boolean {
    const selectedRowStr = JSON.stringify(row);
    return this.#selection.selected(selectedRowStr);
  }

  // Column visibility
  toggleColumnVisibility(columns: string[]) {
    this.#state.update((state) => ({
      ...state,
      preferenceCriteria: {
        ...state.preferenceCriteria,
        visibleColumns: columns,
      },
    }));
  }

  // Helper methods for computed signals
  private getVisibleData(): T[] {
    const { filteredData, preferenceCriteria } = this.#state();
    return filteredData.map((item) => {
      const visibleItem = {} as T;
      preferenceCriteria.visibleColumns.forEach((col) => {
        //@ts-ignore
        visibleItem[col] = item[col];
      });
      return visibleItem;
    });
  }

  private getCurrentPageData(): T[] {
    const { paginationCriteria } = this.#state();
    const startIndex = (paginationCriteria.currentPage - 1) * paginationCriteria.pageSize;
    return this.visibleData().slice(startIndex, startIndex + paginationCriteria.pageSize);
  }

  private getSelectedRowsData(): string[] {
    return this.#selection.items();
  }

  private getGroupedData(): { [key: string]: T[] } {
    const { filteredData, preferenceCriteria } = this.#state();
    if (!preferenceCriteria.groupByColumn) {
      return { All: filteredData };
    }
    return filteredData.reduce((groups, item) => {
      const key = item[preferenceCriteria.groupByColumn as keyof T] as string;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {} as { [key: string]: T[] });
  }

  private getSortCriteriaData(): SortCriteria {
    const { sortCriteria } = this.#state();
    return sortCriteria;
  }

  private getPaginationCriteria(): PaginationCriteria {
    const { paginationCriteria } = this.#state();
    return paginationCriteria;
  }

  private getFilterCriteriaData(): FilterCriteria {
    const { filterCriteria } = this.#state();
    return filterCriteria;
  }

  private getPreferenceCriteriaData() {
    const { preferenceCriteria } = this.#state();
    return preferenceCriteria;
  }

  // Reset to initial state
  resetToInitialState() {
    this.#state.update((state) => ({
      ...state,
      filteredData: state.dataSource,
      paginationCriteria: {
        currentPage: 1,
        totalPages: Math.ceil(state.dataSource.length / state.paginationCriteria.pageSize),
        pageSize: state.paginationCriteria.pageSize,
      },
      selectedRows: [],
      sortCriteria: { key: '', direction: 'ascending' },
      filterCriteria: { column: '', value: '' },
      preferenceCriteria: {
        ...state.preferenceCriteria,
        groupByColumn: '',
      },
    }));
  }
}
