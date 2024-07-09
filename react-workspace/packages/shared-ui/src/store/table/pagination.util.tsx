export const setDataSourcePagination = (state: any, action: any) => {
    // Calculate totalPages based on the full dataset (initialDataSource)
    state.pagination.totalPages = Math.ceil(state.initialDataSource.length / state.pagination.pageSize);

    // Check if there's data in the initialDataSource to paginate
    if (state.initialDataSource.length > 0) {
        // Use initialDataSource to slice the data for current page
        state.dataSource = state.initialDataSource.slice(
            (state.pagination.currentPage - 1) * state.pagination.pageSize, 
            state.pagination.currentPage * state.pagination.pageSize
        );
    }
}

export const updateChangedCurrentPage = (state: any, action: any) => {
    // Update currentPage in pagination
    state.pagination.currentPage = action.payload;

    // Update dataSource based on currentPage
    setDataSourcePagination(state, action);
}

export const setPaginationState = (state: any, pageSize: number, currentPage: number) => {
    // Set pageSize and currentPage in pagination state
    state.pagination.pageSize = pageSize;
    state.pagination.currentPage = currentPage;

    // Recalculate totalPages based on the new pageSize
    state.pagination.totalPages = Math.ceil(state.initialDataSource.length / pageSize);

    // Update dataSource based on the new currentPage and pageSize
    setDataSourcePagination(state, {});
}