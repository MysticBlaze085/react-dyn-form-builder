import type { Meta, StoryObj } from '@storybook/react';
import RadioControl from "./Radio";

const meta = {
  title: "Field/Fields/Radio",
  component: RadioControl,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    // layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof RadioControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    handler: () => ({
      onClick: () => console.log("Radio clicked"),
    }),
    meta: {
      item: { id: "1", value: "React.js" },
    },
  },
};

// export const LoggedOut: Story = {};
