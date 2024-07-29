import type { Meta, StoryObj } from '@storybook/react';
import TableSettingsDialog from './TableSettingsDialog';
import { Provider } from 'react-redux';
import { StoreSate } from '../../../../store';
import { configureStore } from '@reduxjs/toolkit';
import { initialState, tableDataSourceSlice } from '../../../../store/table/table-ds-slice';

// Function to create a new store instance
const createNewStore = (initialState: Partial<StoreSate>) => configureStore({
    reducer: {
        tableDataSource: tableDataSourceSlice.reducer,
    } as any,
    preloadedState: initialState,
});

const data = {
    ...initialState,
    headers: ['Name', 'Job', 'Date'],
    dataSource: [
        {
            name: 'John Michael',
            job: 'Manager',
            date: '23/04/10',
        },
        {
            name: 'Alexa Johnson',
            job: 'CEO',
            date: '23/04/02',
        },
        {
            name: 'Sierra Brooks',
            job: 'Designer',
            date: '23/04/05',
        },
        {
            name: 'Thomas Smith',
            job: 'Developer',
            date: '23/04/05',
        },
        {
            name: 'Jenna Kian',
            job: 'Marketing',
            date: '23/04/18',
        },
        {
            name: 'Denzel Washington',
            job: 'Actor',
            date: '23/04/05',
        },
        {
            name: 'Morgan Freeman',
            job: 'Actor',
            date: '23/04/05',
        },
    ],
    initialHeaders: ['Name', 'Job', 'Date'],
    filterDataSource: {
        column: 'Name',
        value: ''
    },
}

const meta = {
    title: 'Material-TW/Components/Tables/TableSettingsDialog',
    component: TableSettingsDialog,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof TableSettingsDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    decorators: [(story) => <Provider store={createNewStore({ tableDataSource: data })}>{story()}</Provider>],
    args: {},
};
