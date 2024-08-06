import type { Meta, StoryObj } from '@storybook/angular';

import { FieldBuilder } from '../../models';
import { FieldComponent } from '../field.component';

// import { expect } from '@storybook/jest';
// import { within } from '@storybook/testing-library';

const meta: Meta<FieldComponent> = {
    component: FieldComponent,
    title: '(TW) Angular UI / Components / Form / Field',
    args: {
        field: FieldBuilder.createField('text', 'text', 'name', 'Name', 'Name', { required: true }),
    },
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<FieldComponent>;

export const Primary: Story = {
    args: {},
};

// export const Heading: Story = {
//   args: {},
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     expect(canvas.getByText(/field works!/gi)).toBeTruthy();
//   },
// };
