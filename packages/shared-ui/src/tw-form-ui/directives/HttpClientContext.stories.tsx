import { Meta, StoryObj } from '@storybook/react';

import AdkHttpClientWrapper from './HttpClientWrapper';
import React from 'react';

const meta: Meta<typeof AdkHttpClientWrapper> = {
  title: 'Directives/HttpClientWrapper',
  component: AdkHttpClientWrapper,
  argTypes: {
    adkUrl: { control: 'text' },
    adkPage: { control: 'number' },
    adkLimit: { control: 'number' },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    adkUrl: 'https://jsonplaceholder.typicode.com/posts',
    adkPage: 1,
    adkLimit: 10,
  },
};

export const Loading: Story = {
  args: {
    adkUrl: 'https://jsonplaceholder.typicode.com/posts?delay=3',
    adkPage: 1,
    adkLimit: 10,
  },
};

export const ErrorState: Story = {
  args: {
    adkUrl: 'https://invalidurl.com',
    adkPage: 1,
    adkLimit: 10,
  },
};

export const EmptyData: Story = {
  args: {
    adkUrl: 'https://jsonplaceholder.typicode.com/posts?userId=99999',
    adkPage: 1,
    adkLimit: 10,
  },
};
