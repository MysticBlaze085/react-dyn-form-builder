import type { Meta, StoryObj } from '@storybook/react';
import DefaultTable from './Table';
import { Provider } from 'react-redux';
import {store} from '../../../store';
import React from 'react';

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
    title: 'Components/Tables/DefaultTable',
    component: DefaultTable,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [(story) => <Provider store={store}>{story()}</Provider>],
    args: {},
} satisfies Meta<typeof DefaultTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        headers: ['Name', 'Job', 'Date'],
        rows: mockData,
        isSortable: true,
        isDraggable: true,
        isSelectable: true,
    },
};

export const WithGroupBy: Story = {
    args: {
        headers: ['Name', 'Job', 'Date'],
        rows: mockData,
        isSortable: true,
        isDraggable: true,
        isSelectable: true,
        groupBy: 'job',
    },
};
