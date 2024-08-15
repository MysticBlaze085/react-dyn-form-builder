import type { Meta, StoryObj } from '@storybook/angular';

import { FieldBuilder } from '../../../models';
import { SelectComponent } from '../select.component';

const meta: Meta<SelectComponent> = {
    component: SelectComponent,
    title: '(TW) Angular UI / Components / Form / Types / Basic Select',
};
export default meta;
type Story = StoryObj<SelectComponent>;

export const Primary: Story = {
    args: {
        field: FieldBuilder.createField('select', 'select', 'select', 'select', 'select', {
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
//     expect(canvas.getByText(/select works!/gi)).toBeTruthy();
//   },
// };
