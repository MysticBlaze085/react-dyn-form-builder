import type { Meta, StoryObj } from '@storybook/react';
import TextareaFormControl from './Textarea';

const meta = {
  title: 'Field/Type/Textarea',
  component: TextareaFormControl,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    // layout: 'fullscreen',
  },
  args: {
  },
} satisfies Meta<typeof TextareaFormControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    handler: null,
    meta: {
      label: 'Textarea',
      placeholder: null,
      value: '',
      required: true
    },
  },
};

// export const LoggedOut: Story = {};
