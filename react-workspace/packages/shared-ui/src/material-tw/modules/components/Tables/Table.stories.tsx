import type { Meta, StoryObj } from '@storybook/react';
import DefaultTable from './Table';
import { Provider } from 'react-redux';
import { store, StoreSate } from '../../../../store';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { initialState, tableDataSourceSlice } from '../../../../store/table/table-ds-slice';
import ButtonDefault from '../Button';

// Function to create a new store instance
const createNewStore = (initialState: Partial<StoreSate>) => configureStore({
    reducer: {
        tableDataSource: tableDataSourceSlice.reducer,
    } as any,
    preloadedState: initialState,
});

const mockData = [
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
]

const meta = {
    title: 'Material-TW/Components/Tables/DefaultTable',
    component: DefaultTable,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    args: {},
} satisfies Meta<typeof DefaultTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    decorators: [
        (story) => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ width: '80%', margin: '0 auto' }}>
                <Provider store={createNewStore({tableDataSource: initialState})}>{story()}</Provider>
                </div>
            </div>
        ),
    ],
    args: {
        headers: ['Name', 'Job', 'Date'],
        rows: mockData,
        isSortable: true,
        isDraggable: true,
        isSelectable: true,
    },
};

const handleActionClick = (rowData) => {
    alert(`Selected Details: \n\n ${JSON.stringify(rowData, null, 2)}`);
};

const renderActionButton = (rowData) => (
    <ButtonDefault onClick={() => handleActionClick(rowData)}>
        View Details
    </ButtonDefault>
);


export const WithActionButton: Story = {
    decorators: [
        (story) => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ width: '80%', margin: '0 auto' }}>
                    <Provider store={createNewStore({tableDataSource: initialState})}>{story()}</Provider>
                </div>
            </div>
        ),
    ],
    args: {
        headers: ['Name', 'Job', 'Date'],
        rows: mockData,
        isSortable: true,
        isDraggable: true,
        isSelectable: true,
        actionButton: renderActionButton,
    },
};


export const WithGroupBy: Story = {
    decorators: [
        (story) => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ width: '80%', margin: '0 auto' }}>
                <Provider store={createNewStore({tableDataSource: initialState})}>{story()}</Provider>
                </div>
            </div>
        ),
    ],
    args: {
        headers: ['Name', 'Job', 'Date'],
        rows: mockData,
        isSortable: true,
        isDraggable: true,
        isSelectable: true,
        groupBy: 'job',
    },
};
