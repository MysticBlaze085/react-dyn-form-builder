import { useEffect, useState } from 'react';

import React from "react";

export const NgIf: React.FC<{ condition: boolean; children: any }> = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

export const NgFor = ({ items, render, trackBy }) => {
  return (
    <>
      {items.map((item, index) => {
        const key = trackBy ? trackBy(item, index) : index;
        return <React.Fragment key={key}>{render(item, index)}</React.Fragment>;
      })}
    </>
  );
};

// Custom hook to handle async data, similar to Angular's async pipe
export function useAsync(asyncFunction) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    asyncFunction()
      .then(result => {
        if (isMounted) {
          setData(result);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      });

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [asyncFunction]); // Added asyncFunction as a dependency

  return { data, isLoading, error };
}