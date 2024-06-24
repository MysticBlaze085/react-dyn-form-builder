import type { Meta, StoryObj } from '@storybook/angular';

import { DefaultTableComponent } from './default-table.component';
import { TableBuilder } from '../../models';
import { of } from 'rxjs';

const meta: Meta<DefaultTableComponent> = {
  component: DefaultTableComponent,
  title: '(TW) Angular UI / Components / Table / Types / Default Table',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<DefaultTableComponent>;

export const Primary: Story = {
  args: {
    table: TableBuilder.createTable('default-table', ['id', 'defaultTable'], of([{ defaultTable: ['defaultTable', 'testing', 'third'] }]), {
      title: 'Default Table',
      caption: 'This is a default table',
      buttonText: 'Add Something',
      buttonLink: ['/'],
      buttonAction: 'selectedRowsWFieldSelection',
    }),
    showClear: true,
  },
};

