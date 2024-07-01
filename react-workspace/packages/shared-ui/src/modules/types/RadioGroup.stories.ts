import type { Meta, StoryObj } from "@storybook/react";
import RadioGroup from "./RadioGroup";

const meta = {
  title: "Field/Fields/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    handler: () => {
      onclick: () => console.log("Radio clicked");
      onChange: () => console.log("Radio changed");
    },
    meta: {
      label: "Label",
      items: [
        { id: "1", value: "React.js" },
        { id: "2", value: "Vue.js" },
        { id: "3", value: "Svelte" },
      ],
    },
  },
};

// export const LoggedOut: Story = {};
