import type { Meta, StoryObj } from '@storybook/angular';

import { FieldBuilder } from '../../../models';
import { InputComponent } from '../input.component';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

const meta: Meta<InputComponent> = {
    component: InputComponent,
    title: '(TW) Angular UI / Components / Form / Types / Text',
};
export default meta;
type Story = StoryObj<InputComponent>;

export const Primary: Story = {
    args: {
        field: FieldBuilder.createField('text', 'text', 'name', 'Name', 'Name', { required: true }),
    },
};

export const Heading: Story = {
    args: {},
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        expect(canvas.getByText(/input works!/gi)).toBeTruthy();
    },
};
