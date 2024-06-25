import { NgFor, NgIf, useAsync } from './AdkNgEquiv';

import { Meta } from '@storybook/react';
// Step 1: Setup
import React from 'react';

export default {
  title: 'Directives/AdkNgEquiv',
  tags: ['autodocs'],
} as Meta;

// Step 2: Stories for `NgIf`
export const NgIfStory = () => (
  <>
    <NgIf condition={true}>This text is shown because the condition is true.</NgIf>
    <NgIf condition={false}>This text is hidden because the condition is false.</NgIf>
  </>
);

// Step 3: Stories for `NgFor`
const items = ['Item 1', 'Item 2', 'Item 3'];
export const NgForStory = () => (
  <NgFor items={items} trackBy={(item) => item} render={(item, index) => <div key={index}>{item}</div>} />
);

// Step 4: Stories for `useAsync`
const DemoUseAsync = () => {
  const { data, isLoading, error } = useAsync(async () => {
    return new Promise((resolve) => setTimeout(() => resolve('Data loaded'), 1000));
  });

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && <div>{data}</div>}
    </div>
  );
};

export const UseAsyncStory = () => <DemoUseAsync />;