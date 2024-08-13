import { Injectable, computed, signal } from '@angular/core';
import { Pagination, RowData, TableState } from './models';

import { SortRowsUtil } from './utils/sort-rows.util';

@Injectable({
    providedIn: 'root',
})
export class TableDataSourceService {
    #state = signal<TableState>({
        dataSource: [],
        draggedColIndex: null,
        filterDataSource: { column: '', value: '' },
        headers: [],
        initialDataSource: [],
        initialHeaders: [],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            pageSize: 10,
        },
        preferences: {
            visibleColumns: [],
            groupBy: undefined,
        },
        selectedRows: [],
        sortDataSource: { key: '', direction: 'ascending' },
    });

    readonly state = computed(() => this.#state());

    get<K extends keyof TableState>(key: K): TableState[K] {
        return this.#state()[key];
    }

    setHeaders(headers: string[]): void {
        this.#state.update((state) => ({
            ...state,
            headers,
            initialHeaders: headers,
            preferences: {
                ...state.preferences,
                visibleColumns: headers,
            },
            filterDataSource: { column: headers[0], value: '' },
        }));
    }

    setTableDataSource(dataSource: any[]): void {
        this.#state.update((state) => ({
            ...state,
            dataSource,
            initialDataSource: dataSource,
        }));
    }

    initialFilterSearch(): void {
        this.#state.update((state) => ({ ...state, filterDataSource: { column: state.headers[0], value: '' } }));
    }

    setFilter(action: { column: string | null; value: string }): void {
        const column = action.column ?? this.state().filterDataSource.column;
        const value = action.value ?? this.state().filterDataSource.value;
        const filterDataSource = { column, value };
        this.#state.update((state) => ({ ...state, filterDataSource }));
        const selectedRows = this.state().selectedRows;
        if (this.state().filterDataSource.column) {
            if (this.state().filterDataSource.value === '') {
                this.#state.update((state) => ({
                    ...state,
                    dataSource: state.initialDataSource,
                }));
            } else {
                this.#state.update((state) => ({
                    ...state,
                    dataSource: this.filterRows(state.initialDataSource, { column, value }),
                }));
                if (this.state().dataSource.length > this.state().pagination.pageSize) {
                    this.setPaginationState(this.state().pagination);
                }
            }
        }
        if (selectedRows.length > 0) {
            const newSelectedRows = selectedRows.filter((row) => this.state().dataSource.includes(row));
            this.#state.update((state) => ({ ...state, selectedRows: newSelectedRows }));
        }
        if (value === '') this.setPaginationState(this.state().pagination);
    }

    private filterRows = (rows: any[], filter: { column: string; value: string }) => {
        if (!filter.column || !filter.value) return rows; // Return all rows if no filter criteria
        return rows.filter((row) => {
            const column = filter.column.toLowerCase();
            return row[column]?.toLowerCase().includes(filter.value.toLowerCase()); // Case-insensitive filter
        });
    };

    setPreferences(action: { visibleColumns: string[]; groupBy: string }): void {
        this.#state.update((state) => ({
            ...state,
            headers: action.visibleColumns,
            preferences: {
                visibleColumns: action.visibleColumns,
                groupBy: action.groupBy,
            },
        }));
        this.setDataSourcePagination();
    }

    setPaginationState(pagination: Partial<Pagination>): void {
        const pageSize = pagination.pageSize ?? this.#state().pagination.pageSize;
        this.#state.update((state) => ({
            ...state,
            pagination: {
                ...state.pagination,
                ...pagination,
                totalPages: Math.ceil(state.initialDataSource.length / pageSize),
            },
        }));
        this.setDataSourcePagination();
    }

    setCurrentPage(action: number) {
        this.#state.update((state) => ({
            ...state,
            pagination: {
                ...state.pagination,
                currentPage: action,
            },
        }));

        this.updateChangedCurrentPage(action);
    }

    updateChangedCurrentPage(action: any) {
        // Update currentPage in pagination
        this.#state.update((state) => ({
            ...state,
            pagination: {
                ...state.pagination,
                currentPage: action,
            },
        }));

        // Update dataSource based on currentPage
        this.setDataSourcePagination();
    }

    setDataSourcePagination() {
        const state = this.#state();
        // Calculate totalPages based on the full dataset (initialDataSource)
        this.#state.update((state) => ({
            ...state,
            pagination: {
                ...state.pagination,
                totalPages: Math.ceil(state.initialDataSource.length / state.pagination.pageSize),
            },
        }));
        // Check if there's data in the initialDataSource to paginate
        if (state.initialDataSource.length > 0) {
            // Use initialDataSource to slice the data for current page
            this.#state.update((state) => ({
                ...state,
                dataSource: state.initialDataSource.slice(
                    (state.pagination.currentPage - 1) * state.pagination.pageSize,
                    state.pagination.currentPage * state.pagination.pageSize
                ),
            }));
        }
    }

    setGroupBy(groupBy: string): void {
        this.#state.update((state) => ({
            ...state,
            preferences: { ...state.preferences, groupBy: groupBy !== 'non' ? groupBy : 'key' },
        }));
    }

    setSelectedRows(rowData: RowData): void {
        this.#state.update((state) => {
            const existingIndex = state.selectedRows.findIndex((row) => JSON.stringify(row) === JSON.stringify(rowData));
            const newSelectedRows =
                existingIndex !== -1 ? state.selectedRows.filter((_, index) => index !== existingIndex) : [...state.selectedRows, rowData];
            return { ...state, selectedRows: newSelectedRows };
        });
    }

    toggleSelectedAllRows(): void {
        this.#state.update((state) => {
            const allSelected = state.selectedRows.length === state.dataSource.length;
            return {
                ...state,
                selectedRows: allSelected ? [] : [...state.dataSource],
            };
        });
    }

    sortDataSource(sortDataSource: { key: string; direction: 'ascending' | 'descending' }): void {
        if (sortDataSource.key) {
            const sort = new SortRowsUtil();
            this.#state.update((state) => ({
                ...state,
                selectedRows: [],
                sortDataSource,
                dataSource: sort.sortRows(state.dataSource, sortDataSource),
            }));
        }
    }

    getTableState(): TableState {
        return this.#state();
    }

    dragStart(index: number): void {
        this.#state.update((state) => ({ ...state, draggedColIndex: index }));
    }

    dragDrop(index: number): void {
        const targetIndex = index;
        const draggedColIndex = this.state().draggedColIndex;
        const dataSource = this.state().dataSource;
        if (draggedColIndex === null || draggedColIndex === targetIndex) return; // If no valid drag action, exit

        // Update headers array with dragged column
        const newHeaders = [...this.state().headers];
        const draggedHeader = newHeaders.splice(draggedColIndex, 1)[0];
        newHeaders.splice(targetIndex, 0, draggedHeader);

        // Update rows in dataSource array with dragged column
        const newRows = dataSource.map((row: any) => {
            const entries = Object.entries(row);
            const draggedEntry = entries.splice(draggedColIndex, 1)[0];
            entries.splice(targetIndex, 0, draggedEntry);
            return Object.fromEntries(entries); // Convert back to object
        });

        // Update state with new headers, rows, and reset draggedColIndex
        this.setHeaders(newHeaders);
        this.setTableDataSource(newRows);
        this.setSelectedRows([]);
        this.#state.update((state) => ({ ...state, draggedColIndex: null }));
    }
}
