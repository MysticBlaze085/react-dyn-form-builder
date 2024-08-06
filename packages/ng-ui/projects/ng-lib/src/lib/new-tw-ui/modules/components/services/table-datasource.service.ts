import { Injectable, computed, signal } from '@angular/core';
import { Pagination, TableState } from '../models';

import { SortRowsUtil } from '../utils/sort-rows.util';
import { isEqual } from '../utils/is-equal.util';

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

    get(key: string) {
        return this.#state()[key];
    }

    setHeaders(headers: string[]) {
        this.#state.update((state) => ({
            ...state,
            headers: headers,
            initialHeaders: headers,
            preferences: {
                ...state.preferences,
                visibleColumns: headers,
            },
            filterDataSource: { column: headers[0], value: '' },
        }));
    }

    setTableDataSource(dataSource: any[]) {
        this.#state.update((state) => ({
            ...state,
            dataSource: dataSource,
            initialDataSource: dataSource,
        }));
    }

    setPaginationState(pagination: Pagination) {
        this.#state.update((state) => ({
            ...state,
            pagination: {
                ...state.pagination,
                ...pagination,
            },
        }));
    }

    setCurrentPage(currentPage: number) {
        this.#state.update((state) => ({
            ...state,
            pagination: {
                ...state.pagination,
                currentPage: currentPage,
            },
        }));
    }

    setGroupBy(groupBy: string) {
        this.#state.update((state) => ({
            ...state,
            preferences: { ...state.preferences, groupBy: groupBy },
        }));
    }

    setSelectedRows(selectedRows: any) {
        const existingRows = [...this.get('selectedRows')];
        const selectedRow = { ...selectedRows };
        const existingIndex = existingRows.findIndex((row) => isEqual(row, selectedRow));
        if (existingIndex !== -1)
            this.#state.update((state) => ({
                ...state,
                selectedRows: existingRows.filter((row) => !isEqual(row, selectedRow)),
            }));
        else {
            existingRows.push(selectedRow);
            this.#state.update((state) => ({
                ...state,
                selectedRows: existingRows,
            }));
        }
    }

    toggleSelectedAllRows() {
        if (this.get('selectedRows').length === this.get('dataSource').length) {
            this.#state.update((state) => ({
                ...state,
                selectedRows: [],
            }));
        } else {
            this.#state.update((state) => ({
                ...state,
                selectedRows: [...state.dataSource],
            }));
        }
    }

    sortDataSource(sortDataSource: { key: string; direction: 'ascending' | 'descending' }) {
        const sort = new SortRowsUtil();
        if (sortDataSource.key) {
            this.#state.update((state) => ({
                ...state,
                selectedRows: [],
                sortDataSource: sortDataSource,
                dataSource: sort.sortRows(state.dataSource, state.sortDataSource),
            }));
        }
    }

    getTableState() {
        return this.#state();
    }
}
