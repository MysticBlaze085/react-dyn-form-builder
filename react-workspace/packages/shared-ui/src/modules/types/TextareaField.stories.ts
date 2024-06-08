import type { Meta, StoryObj } from '@storybook/react';
import TextareaField from './TextareaField';


const meta = {
  title: 'Field/Fields/TextareaField',
  component: TextareaField,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    // layout: 'fullscreen',
  },
  args: {
  },
} satisfies Meta<typeof TextareaField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    handler: () => {},
    meta: {
      label: 'Label',
    },
  },
};

// export const LoggedOut: Story = {};
