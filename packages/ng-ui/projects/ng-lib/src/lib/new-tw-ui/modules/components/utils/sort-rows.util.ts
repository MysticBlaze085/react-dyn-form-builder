export class SortRowsUtil {
    isDate(value: any) {
        const date = new Date(value);
        return !isNaN(date.getTime());
    }

    sortRows(rows: any[], sortConfig: { key: string; direction: string }) {
        const lowerCaseSortKey = sortConfig.key.toLowerCase();
        return rows.sort((a, b) => {
            const aValue = String(a[lowerCaseSortKey]).toLowerCase();
            const bValue = String(b[lowerCaseSortKey]).toLowerCase();

            // Check if both values are valid dates
            if (this.isDate(aValue) && this.isDate(bValue)) {
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
    }
}
