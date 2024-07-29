import { createContext, useContext, useMemo, useReducer, useRef } from "react";

export interface AdkFormGroup {
  generatedForm: any | undefined;
  edit: () => void;
  cancel: () => void;
  submit: (e) => void;
  set: (form: any) => void;
}

export const AdkFormGroupContext = createContext<AdkFormGroup>(undefined);

// Reducer to manage FormGroup State
const formGroupReducer = (state: any, action: any): any => {
  switch (action.type) {
    case 'SET':
      return { ...state, generatedForm: { ...action.form, disabled: true } };
    case 'EDIT':
      return { ...state, generatedForm: { ...state.generatedForm, disabled: false } };
    case 'CANCEL':
      return { ...state, generatedForm: { ...state.generatedForm, disabled: true } };
    case 'SUBMIT':
      return state; // Add your submit logic here
    default:
      return state;
  }
};

export const useFormGroup = <T extends AdkFormGroup>() => {
  const context = useContext(AdkFormGroupContext) as AdkFormGroup;
  if (!context) {
    throw new Error('useFormGroup must be used within FormGroupProvider');
  }
  return context;
};

export const AdkFormGroupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState = {}; // Define initial state
  const initialStateRef = useRef(initialState); // Store initial state in a ref

  const [generatedForm, dispatch] = useReducer(formGroupReducer, initialState);

  const contextValue = useMemo(() => ({
    generatedForm: Object.values(generatedForm),
    edit: () => dispatch({ type: 'EDIT' }),
    cancel: () => dispatch({ type: 'CANCEL', initialState: initialStateRef.current }),
    submit: () => dispatch({ type: 'SUBMIT' }),
    set: (form) => dispatch({ type: 'SET', form })
  }), [generatedForm]);

  return (
    <AdkFormGroupContext.Provider value={contextValue}>
      {children}
    </AdkFormGroupContext.Provider>
  );
};