import type { Meta, StoryObj } from '@storybook/angular';

import { CheckboxComponent } from '../checkbox.component';
import { FieldBuilder } from '../../../models';

// import { expect } from '@storybook/jest';
// import { within } from '@storybook/testing-library';

const meta: Meta<CheckboxComponent> = {
    component: CheckboxComponent,
    title: '(TW) Angular UI / Components / Form / Types / Checkbox',
};
export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Primary: Story = {
    args: {
        field: FieldBuilder.createField('checkbox', 'checkbox', 'checkbox', 'checkbox', 'checkbox', {
            required: true,
            options: [
                { value: '1', label: 'One', id: '1' },
                { value: '2', label: 'Two', id: '2' },
            ],
        }),
    },
};

// export const Heading: Story = {
//   args: {},
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     expect(canvas.getByText(/checkbox works!/gi)).toBeTruthy();
//   },
// };
