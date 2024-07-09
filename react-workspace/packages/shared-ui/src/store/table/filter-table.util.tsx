// Function to filter rows based on a filter configuration
export const filterRows = (rows: any[], filter: { column: string; value: string }) => {
    if (!filter.column || !filter.value) return rows; // Return all rows if no filter criteria
    return rows.filter(row => {
        const column = filter.column.toLowerCase();
        return row[column]?.toLowerCase().includes(filter.value.toLowerCase()); // Case-insensitive filter
    });
};