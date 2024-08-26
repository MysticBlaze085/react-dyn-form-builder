import { Meta, StoryObj, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

import { TableWrapperComponent } from './table-wrapper.component';
import { action } from '@storybook/addon-actions';

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
];

const meta: Meta<TableWrapperComponent> = {
    title: 'TailwindUI/Components/Tables/Table Wrapper',
    component: TableWrapperComponent,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [TableWrapperComponent],
        }),
        componentWrapperDecorator(
            (story) => `<div style="margin: 3em; display: flex; justify-content: center; align-items: center">
              ${story}
            </div>`
        ),
    ],
    args: {},
};

export default meta;

type Story = StoryObj<TableWrapperComponent>;

export const TableWithAllSettings: Story = {
    args: {
        data: mockData,
        isSelectable: true,
        isSortable: true,
        isDraggable: true,
        tableHeader: {
            title: 'Table Header',
            subtitle: 'Table Subtitle',
            isSearchable: true,
            buttons: [
                {
                    label: 'View ALL',
                    onClick: action('View All clicked'),
                    color: 'primary',
                    icon: '',
                },
                { label: 'add member', onClick: action('Add Member clicked'), color: 'primary', icon: 'person_add' },
            ],
        },
    },
};
