import type { Meta, StoryObj } from '@storybook/angular';

import { FieldBuilder } from '../../../models';
import { PasswordComponent } from '../password.component';

// import { expect } from '@storybook/jest';
// import { within } from '@storybook/testing-library';

const meta: Meta<PasswordComponent> = {
    component: PasswordComponent,
    title: '(TW) Angular UI / Components / Form / Types / Password',
};
export default meta;
type Story = StoryObj<PasswordComponent>;

export const Primary: Story = {
    args: {
        field: FieldBuilder.createField('password', 'password', 'password', 'password', 'password', {
            required: true,
        }),
    },
};

// export const Heading: Story = {
//   args: {},
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     expect(canvas.getByText(/password works!/gi)).toBeTruthy();
//   },
// };
