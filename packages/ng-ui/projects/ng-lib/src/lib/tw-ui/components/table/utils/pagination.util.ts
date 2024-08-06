import { TableState } from '../models';

export class PaginationUtil {
    initialState: TableState;

    constructor(initialState: TableState) {
        this.initialState = initialState;
        this.initialState.pagination.currentPage = 1;
        this.initialState.pagination.totalPages = 0;
        this.initialState.pagination.pageSize = 10;
    }

    // @ts-ignore
    setDataSourcePagination = (action: any) => {
        // Calculate totalPages based on the full dataset (initialDataSource)
        const length = this.initialState.initialDataSource.length;
        const pageSize = this.initialState.pagination.pageSize;
        this.initialState.pagination.totalPages = Math.ceil(length / pageSize);

        // Check if there's data in the initialDataSource to paginate
        if (this.initialState.initialDataSource.length > 0) {
            // Use initialDataSource to slice the data for current page
            this.initialState.dataSource = this.initialState.initialDataSource.slice(
                (this.initialState.pagination.currentPage - 1) * this.initialState.pagination.pageSize,
                this.initialState.pagination.currentPage * this.initialState.pagination.pageSize
            );
        }
    };

    updateChangedCurrentPage = (action: any) => {
        // Update currentPage in pagination
        this.initialState.pagination.currentPage = action.payload;

        // Update dataSource based on currentPage
        this.setDataSourcePagination(action);
    };

    setPaginationState = (pageSize: number, currentPage: number) => {
        // Set pageSize and currentPage in pagination state
        this.initialState.pagination.pageSize = pageSize;
        this.initialState.pagination.currentPage = currentPage;

        // Recalculate totalPages based on the new pageSize
        this.initialState.pagination.totalPages = Math.ceil(this.initialState.initialDataSource.length / pageSize);

        // Update dataSource based on the new currentPage and pageSize
        this.setDataSourcePagination({});
    };
}
