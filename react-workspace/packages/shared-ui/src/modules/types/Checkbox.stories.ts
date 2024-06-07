import type { Meta, StoryObj } from '@storybook/react';
import CheckboxFormControl from './Checkbox';


const meta = {
  title: 'Field/Type/CheckboxFormControl',
  component: CheckboxFormControl,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    // layout: 'fullscreen',
  },
  args: {
    
  },
} satisfies Meta<typeof CheckboxFormControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    handler: null,
    meta: {
      items: undefined,
      required: null,
      item: {key: 'key', value: 'value'}
    },
  },
};

// export const LoggedOut: Story = {};
