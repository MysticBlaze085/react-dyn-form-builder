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
];

export const Default: Story = {
  args: {
    headers: ['name', 'job', 'date'],
    rows: mockData,
    isSelectable: false,
    isSortable: true,
    isDraggable: false,
    title: 'Table Card',
    subtitle: 'This is a table card',
    buttons: [
      { label: 'View ALL', onClick: () => {}, color: 'primary', icon: '' },
      { label: 'add member', onClick: () => {}, color: 'primary', icon: 'person_add' },
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
