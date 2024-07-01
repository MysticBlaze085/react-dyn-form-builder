import type { Meta, StoryObj } from '@storybook/react';
import SelectControl from './Select';
import React from 'react';

const meta = {
  title: 'Field/Fields/Select',
  component: SelectControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div style={{ width: '500px' }}>
        <Story />
        </div>
      </div>
    ),
  ],
  args: {
  },
} satisfies Meta<typeof SelectControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    handler: () => {},
    meta: {
      label: 'Select a City',
      items: [
        { value: 'brazil', label: 'Brazil' },
        { value: 'bucharest', label: 'Bucharest' },
        { value: 'london', label: 'London' },
        { value: 'washington', label: 'Washington' },
      ]
    },
    defaultValue: 'brazil',
  },
};
