import { configureStore, createSlice } from '@reduxjs/toolkit';

const isDate = (value) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
};

const sortRows = (rows, sortConfig) => {
    // Convert sort key to lowercase for case-insensitive comparison
    const lowerCaseSortKey = sortConfig.key.toLowerCase();

    // Clone and sort rows
    return rows.sort((a, b) => {
        // Convert values to strings and lowercase for comparison
        const aValue = String(a[lowerCaseSortKey]).toLowerCase();
        const bValue = String(b[lowerCaseSortKey]).toLowerCase();

        // Date comparison
        if (isDate(aValue) && isDate(bValue)) {
            const dateA = new Date(aValue) as any;
            const dateB = new Date(bValue) as any;
            return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
        } else {
            // String comparison
            if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });
}

const filterRows = (rows, filter) => {
    if (!filter.column || !filter.value) return rows;
    return rows.filter(row => {
        const column = filter.column.toLowerCase();
        return row[column]?.toLowerCase().includes(filter.value.toLowerCase());
    });
};

const tableDataSourceSlice = createSlice({
    name: 'tableDataSource',
    initialState: {
        initialDataSource: [],
        dataSource: [],
        sortDataSource: { key: '', direction: 'ascending' },
        filterDataSource: { column: '', value: '' },
    },
    reducers: {
        setTableDataSource(state, action) {
            state.dataSource = action.payload;
            state.initialDataSource = action.payload;
        },
        clearTableDataSource(state) {
            state.dataSource = [];
        },
        sortDataSource(state, action) {
            // Update sortConfig with action.payload
            state.sortDataSource = action.payload;
            // Sort tableDataSource if sort key is provided
            if (state.sortDataSource.key) {
                state.dataSource = sortRows(state.dataSource, state.sortDataSource);
            }
        },
        filter(state, action) {
            state.filterDataSource = action.payload;
            if (state.filterDataSource.column) {
                if (state.filterDataSource.value === '') state.dataSource = [...state.initialDataSource];
                else state.dataSource = filterRows(state.dataSource, state.filterDataSource);
            }
        },
    },
});

const store = configureStore({
    reducer: {
        tableDataSource: tableDataSourceSlice.reducer,
    },
});


export { store }
export const { setTableDataSource, clearTableDataSource, sortDataSource, filter } = tableDataSourceSlice.actions;
const startState = store.getState();
console.log(JSON.stringify(startState));
