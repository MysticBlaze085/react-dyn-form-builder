import { Meta, StoryObj } from '@storybook/react';

import Radio from './Radio';

export default {
    title: 'Material-TW/Field/Types/Radio',
    component: Radio,
    tags: ['autodocs'],
    parameters: {},
    args: {},
} as Meta<typeof Radio>;

export const Primary: StoryObj<typeof Radio> = {
  args: {
    handler: () => ({
      onClick: () => console.log('Radio clicked'),
      onChange: (e) => console.log('Radio changed', e.target.value),
    }),
    meta: {
      item: { id: '1', value: 'React.js' },
    },
  },
};