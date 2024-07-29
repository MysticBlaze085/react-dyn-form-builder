import type { Meta, StoryObj } from "@storybook/react";
import CheckboxControl from "./Checkbox";

const meta = {
    title: 'Field/Types/Checkbox',
    component: CheckboxControl,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        // layout: 'fullscreen',
    },
    args: {},
} satisfies Meta<typeof CheckboxControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    handler: () => ({
      onClick: () => console.log("Checkbox clicked"),
    }),
    meta: {
      item: {
        value: "Checkbox",
        id: "1",
      },
    },
  },
};

// export const LoggedOut: Story = {};
