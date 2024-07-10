import type { Meta, StoryObj } from '@storybook/react';

import { Provider } from 'react-redux';
import React from 'react';
import TableCard from './TableCard';
import TableDefault from './Table';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { store } from '../../../store';

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

const meta: Meta<typeof TableCard> = {
    title: 'Components/Tables/Table Card',
    component: TableCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (story) => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ width: '80%', margin: '0 auto' }}>
                    <Provider store={store}>{story()}</Provider>
                </div>
            </div>
        ),
    ],
    args: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        showHeader: true,
        showFooter: true,
        title: 'Table Card',
        subtitle: 'This is a table card',
        pageSizes: ['5', '10', '20', '100'],
        buttons: [
            {
                label: 'View All',
                color: 'blue',
                onClick: () => { },
            },
            {
                label: 'Add Member',
                color: 'blue',
                onClick: () => { },
                icon: <UserPlusIcon strokeWidth={2} className="h-4 w-4" />,
            },
        ],
        children: (
            <TableDefault
            isDraggable={true}
            isSortable={true}
            isSelectable={true}
            headers={['Name', 'Job', 'Date']}
            rows={mockData}
            />
        ),
    },
};

export const WithGrouping: Story = {
    args: {
        showHeader: true,
        showFooter: true,
        title: 'Table Card',
        subtitle: 'This is a table card',
        pageSizes: ['5', '10', '20', '100'],
        buttons: [
            {
                label: 'View All',
                color: 'blue',
                onClick: () => { },
            },
            {
                label: 'Add Member',
                color: 'blue',
                onClick: () => { },
                icon: <UserPlusIcon strokeWidth={2} className="h-4 w-4" />,
            },
        ],
        children: (
            <TableDefault
            isDraggable={true}
            isSortable={true}
            isSelectable={true}
            headers={['Name', 'Job', 'Date']}
            rows={mockData}
            groupBy='job'
            />
        ),
    },
};

export const WithoutHeader: Story = {
    args: {
        ...Primary.args,
        showHeader: false,
    },
};

export const WithoutFooter: Story = {
    args: {
        ...Primary.args,
        showFooter: false,
    },
};

export const WithoutHeaderAndFooter: Story = {
    args: {
        showHeader: false,
        showFooter: false,
        pageSizes: ['5', '10', '20', '100'],
        children: (
            <TableDefault
            isDraggable={true}
            isSortable={true}
            isSelectable={true}
            headers={['Name', 'Job', 'Date']}
            rows={mockData}
            />
        ),
    },
};
