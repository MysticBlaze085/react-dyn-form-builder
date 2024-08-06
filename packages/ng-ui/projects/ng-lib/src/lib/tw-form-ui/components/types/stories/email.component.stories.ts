import type { Meta, StoryObj } from '@storybook/angular';

import { EmailComponent } from '../email.component';
import { FieldBuilder } from '../../../models';
import { Validators } from '@angular/forms';

// import { expect } from '@storybook/jest';
// import { within } from '@storybook/testing-library';

const meta: Meta<EmailComponent> = {
    component: EmailComponent,
    title: '(TW) Angular UI / Components / Form / Types / Email',
};
export default meta;
type Story = StoryObj<EmailComponent>;

export const Primary: Story = {
    args: {
        field: FieldBuilder.createField('email', 'email', 'Email', 'Email', 'Email', { required: true }, '', [Validators.email]),
    },
};

// export const Heading: Story = {
//   args: {},
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     expect(canvas.getByText(/input works!/gi)).toBeTruthy();
//   },
// };
