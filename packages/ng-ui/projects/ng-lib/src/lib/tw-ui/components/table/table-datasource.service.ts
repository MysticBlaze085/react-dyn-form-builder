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
}
