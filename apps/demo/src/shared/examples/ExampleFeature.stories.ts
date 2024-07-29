import type { Meta, StoryObj } from "@storybook/react";
import ExampleFeature from "./ExampleFeature";

const meta = {
  title: "Field/Example/ExampleFeature",
  component: ExampleFeature,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    // layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof ExampleFeature>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

// export const LoggedOut: Story = {};
