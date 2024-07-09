import { dragDrop, dragStart, setHeaders, setSelectedRows, setTableDataSource, sortDataSource, toggleSelectedAllRows } from '../../../store'; // Adjust import paths as necessary

import { Dispatch } from '@reduxjs/toolkit';
import { TableRow } from './Table';

class TableHandlers {
    dispatch: Dispatch;
    sortConfig: { key: string; direction: string };

    constructor(dispatch: Dispatch, sortConfig: { key: string; direction: string }) {
        this.dispatch = dispatch;
        this.sortConfig = sortConfig;
    }

    handleDragStart = (index: number) => (event: React.DragEvent<HTMLTableCellElement>) => {
        const action = dragStart(index); // Dispatch drag start action
        this.dispatch(action);
    };

   handleDragOver = (event: React.DragEvent<HTMLTableCellElement>) => {
        event.preventDefault(); // Prevent default behavior
    };

    handleDrop = (targetIndex: number) => (event: React.DragEvent<HTMLTableCellElement>) => {
        event.preventDefault(); // Prevent default behavior
        const action = dragDrop(targetIndex); // Dispatch drag drop action with target index
        this.dispatch(action);
    };

    handleHeaders(headers: string[]) {
        const action = setHeaders(headers);
        this.dispatch(action);
    }

    handleDataSource(rows: TableRow[]) {
        const action = setTableDataSource(rows);
        this.dispatch(action);
    }

    sortRows(key: string) {
        const action = sortDataSource({ key, direction: this.sortConfig.direction === 'ascending' ? 'descending' : 'ascending' });
        this.dispatch(action);
    }

    toggleRowSelection(row: TableRow) {
        const action = setSelectedRows(row);
        this.dispatch(action);
    }

    toggleSelectAll() {
        const action = toggleSelectedAllRows();
        this.dispatch(action);
    }
}

export default TableHandlers;