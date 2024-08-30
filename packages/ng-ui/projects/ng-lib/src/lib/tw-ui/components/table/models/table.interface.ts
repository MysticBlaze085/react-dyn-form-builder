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

export interface TableDataSourceState {
    dataSource: any[];
    draggedColIndex: number | null;
    filteredData: any[];
    headers: string[];
    paginationCriteria: PaginationCriteria;
    preferenceCriteria: PreferenceCriteria;
    selectedRows: any[];
    sortCriteria: SortCriteria;
    filterCriteria: FilterCriteria;
}

export interface PaginationCriteria {
    currentPage: number;
    totalPages: number;
    pageSize: number;
}

export interface FilterCriteria {
    column: string;
    value: string;
}

export interface SortCriteria {
    key: string;
    direction: 'ascending' | 'descending';
}

export interface PreferenceCriteria {
    visibleColumns: string[];
    groupByColumn: string;
}

export interface SettingCriteria extends PreferenceCriteria {
    column: string;
}
