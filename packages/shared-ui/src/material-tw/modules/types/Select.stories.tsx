import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import SelectControl from './Select';

const meta = {
    title: 'Material-TW/Field/Types/Select',
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
    args: {},
} as Meta<typeof SelectControl>;

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
