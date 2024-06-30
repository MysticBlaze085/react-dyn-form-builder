import type { Meta, StoryObj } from '@storybook/react';
import DefaultTable from "./Table";

const meta = {
  title: 'Components/General/Tables/DefaultTable',
  component: DefaultTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    // layout: 'fullscreen',
  },
  args: {
  },
} satisfies Meta<typeof DefaultTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  }
};

// export const LoggedOut: Story = {};
