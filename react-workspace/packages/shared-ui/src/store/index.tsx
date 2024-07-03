import { configureStore, createSlice } from '@reduxjs/toolkit';

// Helper function to check if a value is a valid date
const isDate = (value: any) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
};

// Function to sort rows based on a sort configuration
const sortRows = (rows: any[], sortConfig: { key: string; direction: string }) => {
    const lowerCaseSortKey = sortConfig.key.toLowerCase();
    return rows.sort((a, b) => {
        const aValue = String(a[lowerCaseSortKey]).toLowerCase();
        const bValue = String(b[lowerCaseSortKey]).toLowerCase();

        // Check if both values are valid dates
        if (isDate(aValue) && isDate(bValue)) {
            const dateA = new Date(aValue) as any;
            const dateB = new Date(bValue) as any;
            return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
        } else {
            // If not dates, compare as strings
            if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0; // Default case
    });
};

// Function to filter rows based on a filter configuration
const filterRows = (rows: any[], filter: { column: string; value: string }) => {
    if (!filter.column || !filter.value) return rows; // Return all rows if no filter criteria
    return rows.filter(row => {
        const column = filter.column.toLowerCase();
        return row[column]?.toLowerCase().includes(filter.value.toLowerCase()); // Case-insensitive filter
    });
};

// Function to handle dragging of columns
const dragRows = (state: any, action: any) => {
    const targetIndex = action.payload;
    const draggedColIndex = state.draggedColIndex;
    const dataSource = state.dataSource;
    if (draggedColIndex === null || draggedColIndex === targetIndex) return; // If no valid drag action, exit

    // Update headers array with dragged column
    const newHeaders = [...state.headers];
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
    state.headers = newHeaders;
    state.dataSource = newRows;
    state.draggedColIndex = null;
};

// Create a slice for managing table data source state
const tableDataSourceSlice = createSlice({
    name: 'tableDataSource',
    initialState: {
        headers: [], // Array of column headers
        initialDataSource: [], // Initial unfiltered and unsorted data source
        dataSource: [], // Current data source after sorting and filtering
        selectedRows: [], // Array to store selected rows
        sortDataSource: { key: '', direction: 'ascending' }, // Sort configuration
        filterDataSource: { column: '', value: '' }, // Filter configuration
        draggedColIndex: null, // Index of currently dragged column header
    },
    reducers: {
        // Reducer to set headers
        setHeaders(state, action) {
            state.headers = action.payload;
        },
        // Reducer to set initial and current data source
        setTableDataSource(state, action) {
            state.dataSource = action.payload;
            state.initialDataSource = action.payload;
        },
        // Reducer to clear data source and selected rows
        clearTableDataSource(state) {
            state.dataSource = [];
            state.selectedRows = [];
        },
        // Reducer to set sorting configuration and apply sorting
        sortDataSource(state, action) {
            state.sortDataSource = action.payload;
            state.selectedRows = []; // Clear selected rows on sorting
            if (state.sortDataSource.key) {
                state.dataSource = sortRows(state.dataSource, state.sortDataSource);
            }
        },
        // Reducer to set filtering configuration and apply filtering
        filter(state, action) {
            state.filterDataSource = action.payload;
            state.selectedRows = []; // Clear selected rows on filtering
            if (state.filterDataSource.column) {
                if (state.filterDataSource.value === '') state.dataSource = [...state.initialDataSource];
                else state.dataSource = filterRows(state.dataSource, state.filterDataSource);
            }
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
            const selectedRow = action.payload;
            const existingIndex = state.selectedRows.findIndex(row => row === selectedRow);
            if (existingIndex !== -1) state.selectedRows = state.selectedRows.filter(row => row !== selectedRow); // Toggle selection
            else state.selectedRows.push(selectedRow);
        },
        // Reducer to toggle selection of all rows
        toggleSelectedAllRows(state) {
            if (state.selectedRows.length === state.dataSource.length) state.selectedRows = []; // Deselect all if all are selected
            else state.selectedRows = [...state.dataSource]; // Select all rows if none or some are selected
        }
    },
});

// Configure Redux store with the tableDataSource slice reducer
const store = configureStore({
    reducer: {
        tableDataSource: tableDataSourceSlice.reducer,
    },
});

// Export store and action creators
export { store };
export const { setHeaders, setTableDataSource, clearTableDataSource, sortDataSource, filter, dragStart, dragDrop, setSelectedRows, toggleSelectedAllRows } = tableDataSourceSlice.actions;

// Log initial state to console (for debugging purposes)
const startState = store.getState();
console.log(JSON.stringify(startState));
