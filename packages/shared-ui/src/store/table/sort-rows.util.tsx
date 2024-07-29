// Helper function to check if a value is a valid date
const isDate = (value: any) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
};

// Function to sort rows based on a sort configuration
export const sortRows = (rows: any[], sortConfig: { key: string; direction: string }) => {
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