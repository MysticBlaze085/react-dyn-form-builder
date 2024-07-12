import { setDataSourcePagination, setPaginationState, updateChangedCurrentPage } from './pagination.util';

import { createSlice } from '@reduxjs/toolkit';
import { dragRows } from './drag.util';
import { filterRows } from './filter-table.util';
import { isEqual } from './is-equal.util';
import { sortRows } from './sort-rows.util';

export interface TableState {
    dataSource: any[],
    draggedColIndex: number | null,
    filterDataSource: { column: string, value: string },
    headers: string[],
    initialDataSource: any[],
    initialHeaders: string[],
    pagination: {
        currentPage: number,
        totalPages: number,
        pageSize: number,
    }
    preferences: {
        visibleColumns: string[];
        groupBy: string | undefined;
    },
    selectedRows: any[],
    sortDataSource: { key: string, direction: 'ascending' | 'descending' },
}

const initialState: TableState = {
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
};

export const tableDataSourceSlice = createSlice({
    name: 'tableDataSource',
    initialState: initialState,
    reducers: {
        // Reducer to set headers
        setHeaders(state, action) {
            state.headers = action.payload;
            state.initialHeaders = action.payload;
            state.preferences.visibleColumns = action.payload;
            state.filterDataSource = { column: state.headers[0], value: '' };
        },
        // Reducer to set initial and current data source
        setTableDataSource(state, action) {
            state.dataSource = action.payload;
            state.initialDataSource = action.payload;
        },
        // Reducer to clear data source and selected rows
        clearTableDataSource(state) {
            state.headers = [];
            state.initialHeaders = [];
            state.initialDataSource = [];
            state.dataSource = [];
            state.selectedRows = [];
            state.sortDataSource = { key: '', direction: 'ascending' };
            state.filterDataSource = { column: '', value: '' };
            state.draggedColIndex = null;
            state.pagination = {
                currentPage: 1,
                totalPages: 1,
                pageSize: 10,
            };
            state.preferences = {
                visibleColumns: [],
                groupBy: undefined,
            };
        },
        // Reducer to set sorting configuration and apply sorting
        sortDataSource(state, action) {
            state.sortDataSource = action.payload;
            state.selectedRows = []; // Clear selected rows on sorting
            if (state.sortDataSource.key) {
                state.dataSource = sortRows(state.dataSource, state.sortDataSource);
            }
        },
        // Pagination set initial state
        setPagination(state, action) {
            state.pagination = action.payload;
            // calculate page size
            setPaginationState(state, action.payload.pageSize, action.payload.currentPage);
        },
        // Pagination set current page
        setCurrentPage(state, action) {
            state.pagination.currentPage = action.payload;
            updateChangedCurrentPage(state, action);
        },
        // Reducer to set filtering configuration and apply filtering
        filter(state, action) {
            const column = action.payload.column ?? state.filterDataSource.column;
            const value = action.payload.value ?? state.filterDataSource.value;
            state.filterDataSource = { column, value };
            const selectedRows = state.selectedRows;
            state.selectedRows = [];
            if (state.filterDataSource.column) {
                if (state.filterDataSource.value === '') state.dataSource = [...state.initialDataSource];
                else state.dataSource = filterRows(state.dataSource, state.filterDataSource);
            }
            state.selectedRows = selectedRows;
        },
        // Reducer to set the index of the dragged column
        dragStart(state, action) {
            state.draggedColIndex = action.payload;
        },
        // Reducer to handle dropping of dragged column
        dragDrop(state, action) {
            dragRows(state, action);
        },
        // Reducer to toggle selection of a specific row
        setSelectedRows(state, action) {
            const existingRows = [...state.selectedRows];
            const selectedRow = { ...action.payload };
            const existingIndex = existingRows.findIndex(row => isEqual(row, selectedRow));
            if (existingIndex !== -1) state.selectedRows = existingRows.filter(row => !isEqual(row, selectedRow));
            else {
                existingRows.push(selectedRow);
                state.selectedRows = existingRows;
            }
        },
        // Reducer to toggle selection of all rows
        toggleSelectedAllRows(state) {
            if (state.selectedRows.length === state.dataSource.length) state.selectedRows = []; // Deselect all if all are selected
            else state.selectedRows = [...state.dataSource]; // Select all rows if none or some are selected
        },
        setPreferences(state, action) {
            state.preferences.visibleColumns = action.payload;
            state.headers = state.preferences.visibleColumns;
        },
        setGroupBy(state, action) {
            state.preferences.groupBy = action.payload;
        }
    },
});

