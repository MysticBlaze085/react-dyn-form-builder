import React, { createContext, useContext, useMemo, useReducer, useRef } from 'react';

// Define types for sorting
type SortDirection = 'ascending' | 'descending';
interface SortConfig {
  key: string;
  direction: SortDirection;
}

// Define the context type including sorting logic
export interface SortableTableContextType {
  rowData: any[]; // Assuming rows could be of any type
  sortRows: (key: string) => void;
  sortConfig: SortConfig;
}

// Create context
export const SortableTableContext = createContext<SortableTableContextType | undefined>(undefined);

// Reducer to manage sorting state
const sortReducer = (state: SortConfig, action: { type: 'SORT'; key: string }): SortConfig => {
  switch (action.type) {
    case 'SORT':
      let direction: SortDirection = 'ascending';
      if (state.key === action.key && state.direction === 'ascending') {
        direction = 'descending';
      }
      return { key: action.key, direction };
    default:
      return state;
  }
};

// Hook to use the TableContext
export const useSortableTable = () => {
  const context = useContext(SortableTableContext);
  if (!context) {
    throw new Error('useSortableTable must be used within a SortableTableProvider');
  }
  return context;
};

// Provider component
export const SortableTableProvider: React.FC<{ children: React.ReactNode; initialRows: any[] }> = ({ children, initialRows }) => {
  const initialState: SortConfig = { key: '', direction: 'ascending' };
  const [sortConfig, dispatch] = useReducer(sortReducer, initialState);

  const isDate = (value) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  };

  const sortedRows = React.useMemo(() => {
    if (!sortConfig.key) return initialRows;
  
    const lowerCaseSortKey = sortConfig.key.toLowerCase();
  
    return [...initialRows].sort((a, b) => {
      const aValue = String(a[lowerCaseSortKey]).toLowerCase();
      const bValue = String(b[lowerCaseSortKey]).toLowerCase();
  
      // Check if the values are dates
      if (isDate(aValue) && isDate(bValue)) {
        const dateA = new Date(aValue) as any;
        const dateB = new Date(bValue) as any;
        return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
      } else {
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? Number(-1) : Number(1);
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
      }
      return 0;
    });
  }, [initialRows, sortConfig]);

  const sortRows = (key: string) => {
    dispatch({ type: 'SORT', key });
  };

  const contextValue = useMemo(() => ({
    rowData: sortedRows,
    sortRows,
    sortConfig,
  }), [sortedRows, sortRows, sortConfig]);

  return (
    <SortableTableContext.Provider value={contextValue}>
      {children}
    </SortableTableContext.Provider>
  );
};