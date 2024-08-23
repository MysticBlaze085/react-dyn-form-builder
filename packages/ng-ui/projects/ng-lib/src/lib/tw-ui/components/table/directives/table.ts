import { Directive, Input, computed, inject, signal } from '@angular/core';
import { FilterCriteria, TableDataSourceState } from '../models';
import { ID, Identifiable, RowData } from 'projects/ng-lib/src/lib/tw-form-ui/models';
import { PaginationCriteria, SortCriteria } from '../models/table.interface';

import { AdkSelection } from 'projects/ng-lib/src/lib/tw-form-ui';

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

    @Input() set groupBy(column: string | undefined) {
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
            groupBy: undefined,
        },
        selectedRows: [],
        sortCriteria: { key: '', direction: 'ascending' },
        filterCriteria: { column: '', value: '' },
    });

    // Computed signals for derived state
    readonly headers = computed(() => this.#state().headers);
    readonly visibleData = computed(() => this.getVisibleData());
    readonly filteredData = computed(() => this.getFilterCriteriaData());
    readonly currentPageData = computed(() => this.getCurrentPageData());
    readonly selectedRowsData = computed(() => this.getSelectedRowsData());
    readonly groupedData = computed(() => this.getGroupedData());
    readonly sortCriteriaData = computed(() => this.getSortCriteriaData());
    readonly paginationCriteria = computed(() => this.getPaginationCriteria());

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
        }));
        this.updatePagination();
    }

    private setColumns(columns: string[]) {
        this.#state.update((state) => ({
            ...state,
            headers: columns,
            preferenceCriteria: {
                ...state.preferenceCriteria,
                visibleColumns: columns,
            },
        }));
    }

    setGroupBy(column: string | undefined) {
        this.#state.update((state) => ({
            ...state,
            preferenceCriteria: {
                ...state.preferenceCriteria,
                groupBy: column,
            },
        }));
    }

    // Drag and Drop
    dragStart(index: number): void {
        console.log('dragStart', index, this.#state());
        this.#state.update((state) => ({ ...state, draggedColIndex: index }));
    }

    dragDrop(index: number): void {
        console.log('dragDrop', index);
        const targetIndex = index;
        const { draggedColIndex, dataSource, headers } = this.#state();
        // Reset selected rows if dragging a column
        this.#selection.clear();
        console.log('dragDrop', this.#state(), 'start', draggedColIndex, targetIndex);

        if (draggedColIndex === null || draggedColIndex === targetIndex) return;

        // Update headers array with dragged column
        const newHeaders = [...headers];
        const draggedHeader = newHeaders.splice(draggedColIndex, 1)[0];
        newHeaders.splice(targetIndex, 0, draggedHeader);

        // Update rows in dataSource array with dragged column
        const newRows = dataSource.map((row: any) => {
            const entries = Object.entries(row);
            const draggedEntry = entries.splice(draggedColIndex, 1)[0];
            console.log('dragDropEntry', draggedEntry);
            entries.splice(targetIndex, 0, draggedEntry);
            return Object.fromEntries(entries);
        });

        // Update state with new headers, rows, and reset draggedColIndex
        this.#state.update((state) => ({
            ...state,
            headers: newHeaders,
            dataSource: newRows,
            filteredData: newRows,
            selectedRows: [],
            draggedColIndex: null,
        }));

        // Update other necessary parts of the state
        this.updatePagination();
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
            selectedRows: this.#selection.items().map((item) => JSON.parse(item)),
        }));
    }

    toggleAllRowsSelection() {
        this.#state.update((state) => {
            const allSelected = state.selectedRows.length === state.dataSource.length;
            if (allSelected) this.#selection.clear();

            return {
                ...state,
                selectedRows: allSelected
                    ? []
                    : state.dataSource.map((item) => {
                          this.#selection.select(JSON.stringify(item));
                          return item;
                      }),
            };
        });
    }

    selected(row: RowData): boolean {
        const selectedRowStr = JSON.stringify(row);
        return this.#selection.selected(selectedRowStr);
    }

    // Column visibility
    toggleColumnVisibility(column: string) {
        this.#state.update((state) => ({
            ...state,
            preferenceCriteria: {
                ...state.preferenceCriteria,
                visibleColumns: state.preferenceCriteria.visibleColumns.includes(column)
                    ? state.preferenceCriteria.visibleColumns.filter((col) => col !== column)
                    : [...state.preferenceCriteria.visibleColumns, column],
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

    private getSelectedRowsData(): T[] {
        const { selectedRows, dataSource } = this.#state();
        return dataSource.filter((item) => selectedRows.includes(item));
    }

    private getGroupedData(): { [key: string]: T[] } {
        const { filteredData, preferenceCriteria } = this.#state();
        if (!preferenceCriteria.groupBy) {
            return { All: filteredData };
        }
        return filteredData.reduce((groups, item) => {
            const key = item[preferenceCriteria.groupBy as keyof T] as string;
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
                groupBy: undefined,
            },
        }));
    }
}
