import type { Meta, StoryObj } from '@storybook/react';
import TableDefault from './Table';

const meta = {
    title: 'Components/General/Tables/DefaultTable',
    component: TableDefault,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    args: {},
} satisfies Meta<typeof TableDefault>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        headers: ['Name', 'Job', 'Date', ''],
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
    },
};
