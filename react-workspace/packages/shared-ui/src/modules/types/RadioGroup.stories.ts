import type { Meta, StoryObj } from '@storybook/react';
import Radio from './Radio';
import RadioGroup from './RadioGroup';


const meta = {
  title: 'Field/Fields/RadioGroup',
  component: RadioGroup,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    // layout: 'fullscreen',
  },
  args: {
  },
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

// export const LoggedOut: Story = {};
