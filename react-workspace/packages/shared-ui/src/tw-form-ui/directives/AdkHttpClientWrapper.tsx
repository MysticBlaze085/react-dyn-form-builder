import { HttpClientProvider, useHttpClient } from './HttpClientContext';
import React, { useEffect } from 'react';

import { Value } from '../../modules/types';

export interface AdkHttpClientProps {
  adkUrl: string;
  adkPage?: number;
  adkLimit?: number;
}

const AdkHttpClient: React.FC<AdkHttpClientProps> = ({ adkUrl, adkPage = 1, adkLimit = 10 }) => {
  const { state, fetch, reset } = useHttpClient<any>();

  useEffect(() => {
    fetch(adkUrl, adkPage, adkLimit);
    return () => {
      reset();
    };
  }, [fetch, reset, adkUrl, adkPage, adkLimit]);

  const handleNextPage = () => {
    fetch(adkUrl, Math.floor(state.data.items.length / adkLimit) + 1, adkLimit);
  };

  const handlePrevPage = () => {
    fetch(adkUrl, Math.max(Math.floor(state.data.items.length / adkLimit) - 1, 1), adkLimit);
  };

  return (
    <div>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error: {state.error.message}</p>}
        {state.data.items.map((item, index) => (
          <Value key={index} value={item} />
        ))}
      <p>Total: {state.data.total}</p>
      <span style={{ margin: '5px' }}></span>
      <button onClick={handlePrevPage} disabled={adkPage === 1}>Previous Page</button>
      <span style={{ margin: '5px' }}></span>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
  );
};

const AdkHttpClientWrapper: React.FC<AdkHttpClientProps> = (props) => (
  <HttpClientProvider>
    <AdkHttpClient {...props} />
  </HttpClientProvider>
);

export default AdkHttpClientWrapper;
