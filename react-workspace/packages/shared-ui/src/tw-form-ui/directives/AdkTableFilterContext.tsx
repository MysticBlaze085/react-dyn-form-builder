// AdkTableFilterContext.tsx
import React, { createContext, useContext, useMemo, useReducer } from 'react';

// Define types
type Filter = {
  column: string;
  value: string;
};

interface AdkTableFilterContextType {
  filter: Filter;
  filteredRows: any[];
  addFilter: (filter: Filter) => void;
  updateFilter: (column: string, value: string) => void;
  clearFilters: () => void;
}

// Create context
export const AdkTableFilterContext = createContext<AdkTableFilterContextType | undefined>(undefined);

// Reducer to manage the filters state
const filtersReducer = (state: Filter, action: any): Filter => {
  switch (action.type) {
    case 'ADD_FILTER':
      return action.filter;
    case 'UPDATE_FILTER':
      return { ...state, column: action.column, value: action.value };
    case 'CLEAR_FILTERS':
      return { column: '', value: '' };
    default:
      return state;
  }
};

// Hook to use the TableFilterContext
export const useTableFilter = () => {
  const context = useContext(AdkTableFilterContext);
  if (!context) {
    throw new Error('useTableFilter must be used within an AdkTableFilterProvider');
  }
  return context;
};

const filterRows = (rows, filter) => {
  if (!filter.column || !filter.value) return rows;
  return rows.filter(row => {
    const column = filter.column.toLowerCase();
    return row[column]?.toLowerCase().includes(filter.value.toLowerCase());
  });
};

// Provider component
export const AdkTableFilterProvider: React.FC<{ children: React.ReactNode, initialRows: any[] }> = ({ children, initialRows }) => {
  const initialState: Filter = { column: '', value: '' };
  const [filter, dispatch] = useReducer(filtersReducer, initialState);

  const filteredRows = useMemo(() => filterRows(initialRows, filter), [initialRows, filter]);

  const contextValue = useMemo(() => ({
    filter,
    filteredRows,
    addFilter: (filter: Filter) => dispatch({ type: 'ADD_FILTER', filter }),
    updateFilter: (column: string, value: string) => dispatch({ type: 'UPDATE_FILTER', column, value }),
    clearFilters: () => dispatch({ type: 'CLEAR_FILTERS' }),
  }), [filter, filteredRows]);

  return (
    <AdkTableFilterContext.Provider value={contextValue}>
      {children}
    </AdkTableFilterContext.Provider>
  );
};
