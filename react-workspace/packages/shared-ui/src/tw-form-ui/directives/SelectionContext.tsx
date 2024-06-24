import React, { createContext, useContext, useReducer } from 'react';

// Define the shape of the context
interface AdkSelectionContextType {
  items: { [id: string]: boolean };
  select: (...ids: string[]) => void;
  deselect: (id: string) => void;
  clear: () => void;
  selected: (id: string) => boolean;
  reset: () => void;
}

// Create the context
const AdkSelectionContext = createContext<AdkSelectionContextType | undefined>(undefined);

// Define actions for the reducer
type Action =
  | { type: 'SELECT'; ids: string[] }
  | { type: 'DESELECT'; id: string }
  | { type: 'CLEAR' }
  | { type: 'RESET' };

// Reducer function to manage state
const selectionReducer = (state: { [id: string]: boolean }, action: Action) => {
  switch (action.type) {
    case 'SELECT':
      return action.ids.reduce((acc, id) => ({ ...acc, [id]: true }), state);
    case 'DESELECT':
      const { [action.id]: _, ...rest } = state;
      return rest;
    case 'CLEAR':
      return {};
    case 'RESET':
      // Implement reset logic if needed, for now it just clears
      return {};
    default:
      return state;
  }
};

// Provider component
export const AdkSelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, dispatch] = useReducer(selectionReducer, {});

  const select = (...ids: string[]) => dispatch({ type: 'SELECT', ids });
  const deselect = (id: string) => dispatch({ type: 'DESELECT', id });
  const clear = () => dispatch({ type: 'CLEAR' });
  const selected = (id: string) => !!items[id];
  const reset = () => dispatch({ type: 'RESET' });

  const value = { items, select, deselect, clear, selected, reset };

  return <AdkSelectionContext.Provider value={value}>{children}</AdkSelectionContext.Provider>;
};

// Custom hook to use the context
export const useAdkSelection = () => {
  const context = useContext(AdkSelectionContext);
  if (!context) {
    throw new Error('useAdkSelection must be used within an AdkSelectionProvider');
  }
  return context;
};