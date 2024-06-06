import type { Meta, StoryObj } from '@storybook/react';
import Radio from './Radio';


const meta = {
  title: 'Field/Type/Radio',
  component: Radio,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    // layout: 'fullscreen',
  },
  args: {
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    handler: null,
    touched: null,
    hasError: null,
    meta: {
      label: null,
      placeholder: null,
      classes: null,
    },
  },
};

// export const LoggedOut: Story = {};
