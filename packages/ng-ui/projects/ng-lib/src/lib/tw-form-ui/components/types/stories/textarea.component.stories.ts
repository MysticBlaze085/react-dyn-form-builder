import type { Meta, StoryObj } from '@storybook/angular';

import { FieldBuilder } from '../../../models';
import { TextareaComponent } from '../textarea.component';

// import { within } from '@storybook/testing-library';
// import { expect } from '@storybook/jest';

const meta: Meta<TextareaComponent> = {
    component: TextareaComponent,
    title: '(TW) Angular UI / Components / Form / Types / Textarea',
};
export default meta;
type Story = StoryObj<TextareaComponent>;

export const Primary: Story = {
    args: {
        field: FieldBuilder.createField('textarea', 'textarea', 'textarea', 'textarea', 'textarea'),
    },
};

// export const Heading: Story = {
//   args: {},
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     expect(canvas.getByText(/textarea works!/gi)).toBeTruthy();
//   },
// };
