import { Meta, StoryObj } from '@storybook/angular';

import { TwTableCardComponent } from '../tw-table-card.component';

const meta: Meta<TwTableCardComponent> = {
    title: 'TailwindUI/Components/Tables/Table Card',
    component: TwTableCardComponent,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TwTableCardComponent>;

const mockData = [
    { name: 'John Doe', job: 'Developer', date: '2024-08-01' },
    { name: 'Jane Smith', job: 'Designer', date: '2024-08-02' },
    { name: 'Bob Johnson', job: 'Manager', date: '2024-08-03' },
];

export const Default: Story = {
    args: {
        headers: ['name', 'job', 'date'],
        rows: mockData,
        isSelectable: false,
        isSortable: true,
        isDraggable: false,
        title: 'Table Card Title',
        subtitle: 'Table Card Subtitle',
        buttons: [
            { label: 'View ALL', onClick: () => {}, color: 'blue', icon: '' },
            { label: 'add member', onClick: () => {}, color: 'blue', icon: 'person_add' },
        ],
    },
};

export const Selectable: Story = {
    args: {
        ...Default.args,
        isSelectable: true,
    },
};

export const Draggable: Story = {
    args: {
        ...Default.args,
        isDraggable: true,
    },
};

export const WithActionColumn: Story = {
    args: {
        ...Default.args,
        actionColName: 'Actions',
        actionButton: 'Edit',
    },
};

export const Grouped: Story = {
    args: {
        ...Default.args,
        groupBy: 'job',
    },
};
