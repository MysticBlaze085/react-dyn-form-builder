import type { Meta, StoryObj } from '@storybook/react';
import RadioGroup from './RadioGroup';


const meta = {
    title: 'Field/Types/RadioGroup',
    component: RadioGroup,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    handler: () => {},
    meta: {
      label: 'Label',
      items: [{ id: '1', value: 'React.js' }, { id: '2', value: 'Vue.js' }, { id: '3', value: 'Svelte' }],
    },
  },
};
