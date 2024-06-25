import { HttpClientProvider, useHttpClient } from './HttpClientContext';
import React, { useEffect } from 'react';

import { Value } from '../../modules/types';

export interface AdkHttpClientProps {
  adkUrl: string;
  adkPage?: number;
  adkLimit?: number;
}

const AdkHttpClient: React.FC<AdkHttpClientProps> = ({ adkUrl, adkPage = 1, adkLimit = 10 }) => {
  const { state, fetch, post, reset } = useHttpClient<any>();

  useEffect(() => {
    fetch(adkUrl, adkPage, adkLimit);
    return () => {
      reset();
    };
  }, [fetch, reset, adkUrl, adkPage, adkLimit]);

  const handleNextPage = async () => {
    await fetch(adkUrl, Math.floor(state.data.items.length / adkLimit) + 1, adkLimit);
  };

  const handlePrevPage = async () => {
    await fetch(adkUrl, Math.max(Math.floor(state.data.items.length / adkLimit) - 1, 1), adkLimit);
  };

    // New method to handle POST requests
    // const handleSubmit = async (postData) => {
    //   const response = await post(adkUrl, postData);
    //   // Handle response or state updates based on the POST request's result
    //   console.log(response);
    // };

  return (
    <div>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error: {state.error.message}</p>}
        {state.data.items.map((item, index) => (
          <Value key={index} value={item} />
        ))}
      <p>Total: {state.data.total}</p>
      <span style={{ margin: '5px' }}></span>
      <button onClick={handlePrevPage}>Previous Page</button>
      <span style={{ margin: '5px' }}></span>
      <button onClick={handleNextPage}>Next Page</button>
      {/* Assuming there's a form or some input elements to gather postData from */}
      {/* <button onClick={() => handleSubmit(postData)}>Submit Data</button> */}
    </div>
  );
};

const AdkHttpClientWrapper: React.FC<AdkHttpClientProps> = (props) => (
  <HttpClientProvider>
    <AdkHttpClient {...props} />
  </HttpClientProvider>
);

export default AdkHttpClientWrapper;
