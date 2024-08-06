import type { Meta, StoryObj } from '@storybook/angular';

import { FieldBuilder } from '../../../models';
import { RadioComponent } from '../radio.component';

// import { within } from '@storybook/testing-library';
// import { expect } from '@storybook/jest';

const meta: Meta<RadioComponent> = {
    component: RadioComponent,
    title: '(TW) Angular UI / Components / Form / Types / Radio',
};
export default meta;
type Story = StoryObj<RadioComponent>;

export const Primary: Story = {
    args: {
        field: FieldBuilder.createField('radio', 'radio', 'radio', 'radio', 'radio', {
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
//     expect(canvas.getByText(/radio works!/gi)).toBeTruthy();
//   },
// };
