export interface TableState {
    dataSource: any[];
    draggedColIndex: number | null;
    filterDataSource: { column: string; value: string };
    headers: string[];
    initialDataSource: any[];
    initialHeaders: string[];
    pagination: {
        currentPage: number;
        totalPages: number;
        pageSize: number;
    };
    preferences: {
        visibleColumns: string[];
        groupBy: string | undefined;
    };
    selectedRows: any[];
    sortDataSource: { key: string; direction: 'ascending' | 'descending' };
    [key: string]: any;
}
