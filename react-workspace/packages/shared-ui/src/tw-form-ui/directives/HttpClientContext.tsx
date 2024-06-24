import React, { ReactNode, createContext, useCallback, useContext, useMemo, useReducer, useRef } from 'react';

import axios from 'axios';

type ID = string | number;

interface HttpResponse<T> {
  total: number;
  items: T[];
}

interface HttpClientState<T> {
  data: HttpResponse<T>;
  loading: boolean;
  error: Error | null;
}

interface HttpClientAction<T> {
  type: 'FETCH_INIT' | 'FETCH_SUCCESS' | 'FETCH_FAILURE' | 'RESET';
  payload?: HttpResponse<T>;
  error?: Error;
}

interface HttpClientContextType<T> {
  state: HttpClientState<T>;
  fetch: (url: string, page?: number, limit?: number) => void;
  reset: () => void;
}

const initialState = {
  data: { total: 0, items: [] },
  loading: false,
  error: null,
};

const HttpClientContext = createContext<HttpClientContextType<any> | undefined>(undefined);

const httpClientReducer = <T,>(state: HttpClientState<T>, action: HttpClientAction<T>): HttpClientState<T> => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload! };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.error! };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const HttpClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialStateRef = useRef(initialState);

  const [state, dispatch] = useReducer(httpClientReducer, initialState);

  const fetch = useCallback(async (url: string, page: number = 1, limit: number = 5) => {
    dispatch({ type: 'FETCH_INIT' });
    try {
      const response = await axios.get(url, {
        params: { _page: page, _per_page: limit },
      });
      const total = parseInt(response.headers['x-total-count'] ?? '0', 10);
      const items = response.data;
      dispatch({ type: 'FETCH_SUCCESS', payload: { total, items } });
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', error });
    }
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const contextValue = useMemo(() => ({
    state,
    fetch,
    reset,
  }), [state, fetch, reset]);

  return (
    <HttpClientContext.Provider value={contextValue}>
      {children}
    </HttpClientContext.Provider>
  );
};

export const useHttpClient = <T,>() => {
  const context = useContext(HttpClientContext) as HttpClientContextType<T>;
  if (!context) {
    throw new Error('useHttpClient must be used within a HttpClientProvider');
  }
  return context;
};
