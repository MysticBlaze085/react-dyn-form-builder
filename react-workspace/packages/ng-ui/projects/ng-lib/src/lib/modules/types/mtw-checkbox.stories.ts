import type { Meta, StoryObj } from '@storybook/angular';

import { MtwCheckboxComponent } from './mtw-checkbox.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<MtwCheckboxComponent> = {
  title: 'Example/MtwCheckboxComponent',
  component: MtwCheckboxComponent,
  tags: ['autodocs'],
  render: (args: MtwCheckboxComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<MtwCheckboxComponent>;

export const Primary: Story = {
  args: {
  },
};
