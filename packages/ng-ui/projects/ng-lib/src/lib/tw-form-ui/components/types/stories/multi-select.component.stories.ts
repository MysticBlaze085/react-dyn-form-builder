import type { Meta, StoryObj } from '@storybook/angular';

import { FieldBuilder } from '../../../models';
import { MultiSelectComponent } from '../multi-select.component';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

const meta: Meta<MultiSelectComponent> = {
    component: MultiSelectComponent,
    title: '(TW) Angular UI / Components / Form / Types / Select',
};
export default meta;
type Story = StoryObj<MultiSelectComponent>;

export const MultiSelect: Story = {
    args: {
        field: FieldBuilder.createField('custom-select', 'multi-select', 'name', 'Name', 'Name', {
            isMultipleTag: true,
            required: true,
            options: [
                { value: '1', label: 'One', id: '1' },
                { value: '2', label: 'Two', id: '2' },
            ],
        }),
    },
};

export const Select: Story = {
    args: {
        field: FieldBuilder.createField('select', 'select', 'name', 'Name', 'Name', {
            isMultipleTag: false,
            required: true,
            options: [
                { value: '1', label: 'One', id: '1' },
                { value: '2', label: 'Two', id: '2' },
            ],
        }),
    },
};

export const Heading: Story = {
    args: {},
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        expect(canvas.getByText(/multi-select works!/gi)).toBeTruthy();
    },
};
