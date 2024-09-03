import { Meta, StoryObj } from '@storybook/angular';

import { TwTableCardComponent } from '../tw-table-card.component';
import { action } from '@storybook/addon-actions';
import { withActions } from '@storybook/addon-actions/decorator';

const meta: Meta<TwTableCardComponent> = {
    title: 'TailwindUI/Components/Tables/Table Card',
    component: TwTableCardComponent,
    tags: ['autodocs'],
    decorators: [withActions],
};

export default meta;
type Story = StoryObj<TwTableCardComponent>;

const mockData = [
    {
        name: 'John Michael',
        job: 'Manager So I started to walk into the water. I wont lie to you, I was terrified. But I pressed on, and as I made my way past the breakers, the water became calmer and calmer.',
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
    {
        name: 'Array Testing',
        job: ['CEO', 'Manager', 'Designer'],
        date: '23/04/05',
    },
];

export const Default: Story = {
    args: {
        headers: ['name', 'job', 'date'],
        rows: mockData,
        isSelectable: false,
        hasFields: false,
        isSortable: true,
        isDraggable: false,
        isSearchable: true,
        title: 'Table Card',
        subtitle: 'This is a table card',
        buttons: [
            {
                label: 'View ALL',
                onClick: action('View All clicked'),
                color: 'primary',
                icon: '',
            },
            { label: 'add member', onClick: action('Add Member clicked'), color: 'primary', icon: 'person_add' },
        ],
        selectedRowsChange: action('selectedRowsChange') as any,
    },
};

export const Selectable: Story = {
    args: {
        ...Default.args,
        isSelectable: true,
        hasFields: true,
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
        actionButton: 'Edit',
    },
};

export const Grouped: Story = {
    args: {
        ...Default.args,
        groupBy: 'job',
    },
};
