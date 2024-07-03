import type { Meta, StoryObj } from '@storybook/react';
import TableSettingsDialog from './TableSettingsDialog';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import React from 'react';

const meta = {
    title: 'Components/Tables/TableSettingsDialog',
    component: TableSettingsDialog,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [(story) => <Provider store={store}>{story()}</Provider>],
    args: {},
} satisfies Meta<typeof TableSettingsDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
