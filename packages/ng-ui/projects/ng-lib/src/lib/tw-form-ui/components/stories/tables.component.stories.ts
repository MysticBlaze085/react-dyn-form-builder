import type { Meta, StoryObj } from '@storybook/angular';

import { TableBuilder } from '../../models';
import { TablesComponent } from '../tables.component';
import { of } from 'rxjs';

// import { within } from '@storybook/testing-library';
// import { expect } from '@storybook/jest';

const meta: Meta<TablesComponent> = {
    component: TablesComponent,
    title: '(TW) Angular UI / Components / Table / Tables',

    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<TablesComponent>;

export const Primary: Story = {
    args: {
        tableConfig: TableBuilder.createTable('default-table', ['id', 'defaultTable'], of([{ defaultTable: 'defaultTable' }])),
        wrapperClass: 'mt-2 grid grid-cols-1 gap-x-4 gap-y-4 p-4',
    },
};

// export const Heading: Story = {
//   args: {
//     fieldConfig: [],
//     wrapperClass: 'mt-2 grid grid-cols-3 gap-x-4 gap-y-4 p-4',
//   },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     expect(canvas.getByText(/fields works!/gi)).toBeTruthy();
//   },
// };
