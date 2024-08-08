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

    setPaginationState(pagination: Partial<Pagination>): void {
        this.#state.update((state) => ({
            ...state,
            pagination: {
                ...state.pagination,
                ...pagination,
            },
        }));
    }

    setGroupBy(groupBy: string): void {
        this.#state.update((state) => ({
            ...state,
            preferences: { ...state.preferences, groupBy },
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

        console.log('dragDrop', newHeaders, newRows);

        // Update state with new headers, rows, and reset draggedColIndex
        this.setHeaders(newHeaders);
        this.setTableDataSource(newRows);
        this.setSelectedRows([]);
        this.#state.update((state) => ({ ...state, draggedColIndex: null }));
    }
}