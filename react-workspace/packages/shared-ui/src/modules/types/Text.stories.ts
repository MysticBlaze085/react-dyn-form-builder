import type { Meta, StoryObj } from '@storybook/react';
import TextFunction from './Text';

const meta = {
  title: 'Field/Type/TextFunction',
  component: TextFunction,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    // layout: 'fullscreen',
  },
  args: {
    handler: () => {},
    meta: {
      label: 'Username',
      placeholder: 'Username',
      value: '',
     required: true
    },
  },
} satisfies Meta<typeof TextFunction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    handler: () => {},
    meta: {
      label: 'Username',
      placeholder: 'Username',
      value: '',
     required: true
    },
  },
};

// export const LoggedOut: Story = {};
