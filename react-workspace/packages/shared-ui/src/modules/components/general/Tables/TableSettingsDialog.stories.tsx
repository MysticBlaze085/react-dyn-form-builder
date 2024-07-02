import type { Meta, StoryObj } from '@storybook/react';
import TableSettingsDialog from './TableSettingsDialog';

const meta = {
    title: 'Components/General/Tables/TableSettingsDialog',
    component: TableSettingsDialog,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    args: {},
} satisfies Meta<typeof TableSettingsDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
