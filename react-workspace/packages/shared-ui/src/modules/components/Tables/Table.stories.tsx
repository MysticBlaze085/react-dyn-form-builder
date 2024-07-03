import type { Meta, StoryObj } from '@storybook/react';
import DefaultTable from './Table';
import { Provider } from 'react-redux';
import {store} from '../../../store';
import React from 'react';

const meta = {
    title: 'Components/General/Tables/DefaultTable',
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
        rows: [
            {
                name: 'John Michael',
                job: 'Manager',
                date: '23/04/15',
            },
            {
                name: 'Alexa Johnson',
                job: 'CEO',
                date: '23/04/18',
            },
            {
                name: 'Sierra Brooks',
                job: 'Designer',
                date: '23/04/12',
            },
            {
                name: 'Thomas Smith',
                job: 'Developer',
                date: '23/04/10',
            },
            {
                name: 'Jenna Kian',
                job: 'Marketing',
                date: '23/04/01',
            },
        ],
        isSortable: true,
        isDraggable: true,
        isSelectable: true,
    },
};
