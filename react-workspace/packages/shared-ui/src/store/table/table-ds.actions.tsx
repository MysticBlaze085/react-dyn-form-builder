import { tableDataSourceSlice } from './table-ds-slice';

export const { setHeaders, setTableDataSource, clearTableDataSource, sortDataSource, filter, dragStart, dragDrop, setSelectedRows, toggleSelectedAllRows, setPreferences, setPagination, setCurrentPage } = tableDataSourceSlice.actions;
