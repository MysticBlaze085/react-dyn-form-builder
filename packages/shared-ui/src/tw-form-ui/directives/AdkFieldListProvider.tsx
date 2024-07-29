import React, { createContext, useContext, useMemo, useReducer, useRef } from 'react';

import {Field} from '../models'

// Define types
type ID = string | number;

export interface AdkFieldListContextType<T extends Field> {
  fields: T[];
  get: (id: ID) => T | undefined;
  add: (...newFields: T[]) => void;
  update: (field: T) => void;
  remove: (field: T) => void;
  clear: () => void;
  reset: () => void; // Add reset method
}

// Create context
export const AdkFieldListContext = createContext<AdkFieldListContextType<Field> | undefined>(undefined);

// Reducer to manage the fields state
const fieldsReducer = (state: Record<ID, Field>, action: any): Record<ID, Field> => {
  switch (action.type) {
    case 'ADD':
      return action.fields.reduce((acc, field) => ({ ...acc, [field.id]: field }), state);
    case 'UPDATE':
      return { ...state, [action.field.id]: action.field };
    case 'REMOVE':
      const { [action.field.id]: _, ...rest } = state;
      return rest;
    case 'CLEAR':
      return {};
    case 'RESET':
      return action.initialState;
    default:
      return state;
  }
};

// Hook to use the FieldListContext
export const useFieldList = <T extends Field>() => {
  const context = useContext(AdkFieldListContext) as AdkFieldListContextType<T>;
  if (!context) {
    throw new Error('useFieldList must be used within a FieldListProvider');
  }
  return context;
};

// Provider component
export const AdkFieldListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState = {}; // Define initial state
  const initialStateRef = useRef(initialState); // Store initial state in a ref

  const [fields, dispatch] = useReducer(fieldsReducer, initialState);

  const contextValue = useMemo(() => ({
    fields: Object.values(fields),
    get: (id: ID) => fields[id],
    add: (...newFields: Field[]) => {
      initialStateRef.current = {
        ...initialStateRef.current,
        ...newFields.reduce((acc, field) => ({ ...acc, [field.id]: field }), {}),
      };
      dispatch({ type: 'ADD', fields: newFields });
    },
    update: (field: Field) => dispatch({ type: 'UPDATE', field }),
    remove: (field: Field) => dispatch({ type: 'REMOVE', field }),
    clear: () => dispatch({ type: 'CLEAR' }),
    reset: () => dispatch({ type: 'RESET', initialState: initialStateRef.current }), // Use initial state ref
  }), [fields]);

  return (
    <AdkFieldListContext.Provider value={contextValue}>
      {children}
    </AdkFieldListContext.Provider>
  );
};
