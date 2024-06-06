import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta = {
  title: 'Field/Type/Text',
  component: Text,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    // layout: 'fullscreen',
  },
  args: {
  },
} satisfies Meta<typeof Text>;

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
