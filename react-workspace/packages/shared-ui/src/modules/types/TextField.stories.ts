import type { Meta, StoryObj } from '@storybook/react';

import TextField from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Field/Fields/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    // layout: 'fullscreen',
  },
  args: {
    handler: () => {}, // Provide default props
    meta: {
      label: 'Label', // Provide default props
    },
  },
};

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
