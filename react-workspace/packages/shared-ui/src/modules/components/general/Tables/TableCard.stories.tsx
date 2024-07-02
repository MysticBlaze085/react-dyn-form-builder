import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import TableCard from './TableCard';
import TableDefault from './Table';
import { UserPlusIcon } from '@heroicons/react/24/solid';

const meta: Meta<typeof TableCard> = {
    title: 'Components/General/Tables/Table Card',
    component: TableCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', overflow: 'hidden' }}>
                <div style={{ width: '80%', margin: '0 auto' }}>
                    // provider wrapper around table card to carry over context global variables
                    <Story />
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
        currentPage: 1,
        totalPages: 5,
        buttons: [
            {
                label: 'View All',
                color: 'blue',
                onClick: () => {},
            },
            {
                label: 'Add Member',
                color: 'blue',
                onClick: () => {},
                icon: <UserPlusIcon strokeWidth={2} className="h-4 w-4" />,
            },
        ],
        children: (
            <TableDefault
                isDraggable={true}
                isSortable={true}
                headers={['Name', 'Job', 'Date', '']}
                rows={[
                    {
                        name: 'John Michael',
                        job: 'Manager',
                        date: '23/04/10',
                    },
                    {
                        name: 'Alexa Johnson',
                        job: 'CEO',
                        date: '23/04/01',
                    },
                    {
                        name: 'Sierra Brooks',
                        job: 'Designer',
                        date: '23/04/05',
                    },
                    {
                        name: 'Thomas Smith',
                        job: 'Developer',
                        date: '23/04/18',
                    },
                    {
                        name: 'Jenna Kian',
                        job: 'Marketing',
                        date: '23/04/11',
                    },
                ]}
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
        currentPage: 1,
        totalPages: 5,
        children: (
            <TableDefault
                isDraggable={true}
                isSortable={true}
                headers={['Name', 'Job', 'Date', '']}
                rows={[
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
                ]}
            />
        ),
    },
};
