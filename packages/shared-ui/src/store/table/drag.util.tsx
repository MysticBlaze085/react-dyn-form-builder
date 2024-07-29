// Function to handle dragging of columns
export const dragRows = (state: any, action: any) => {
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
    state.selectedRows = [];
};
