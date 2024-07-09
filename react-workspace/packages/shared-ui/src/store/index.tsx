import { configureStore } from '@reduxjs/toolkit';
import { tableDataSourceSlice } from './table/table-ds-slice';

// Configure Redux store with the tableDataSource slice reducer
const store = configureStore({
    reducer: {
        tableDataSource: tableDataSourceSlice.reducer,
    },
});

// Export store and action creators
export { store };
export * from './table/table-ds.actions';

// Log initial state to console (for debugging purposes)
const startState = store.getState();
console.log(JSON.stringify(startState));


