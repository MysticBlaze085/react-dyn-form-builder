import type { Meta, StoryObj } from '@storybook/react';
import Textarea from './Textarea';

const meta = {
  title: 'Field/Type/Textarea',
  component: Textarea,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    // layout: 'fullscreen',
  },
  args: {
  },
} satisfies Meta<typeof Textarea>;

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
