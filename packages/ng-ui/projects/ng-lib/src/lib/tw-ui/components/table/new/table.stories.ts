import { Meta, StoryObj, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

import { TableComponent } from './table.component';
import { action } from '@storybook/addon-actions';

const meta: Meta<TableComponent> = {
    title: 'TailwindUI/Components/Tables/Table',
    component: TableComponent,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [TableComponent],
        }),
        componentWrapperDecorator(
            (story) => `<div style="margin: 3em; display: flex; justify-content: center; align-items: center">
              ${story}
            </div>`
        ),
    ],
    argTypes: {
        isSelectable: {
            control: 'boolean',
        },
        isSortable: {
            control: 'boolean',
        },
        isDraggable: {
            control: 'boolean',
        },
        isWrapped: {
            control: 'boolean',
        },
        isSearchable: {
            control: 'boolean',
        },
        isActionButton: {
            control: 'boolean',
        },
        data: {
            control: 'object',
        },
        columns: {
            control: 'array',
        },
        tableHeader: {
            control: 'object',
        },
    },
};

export default meta;

type Story = StoryObj<TableComponent>;

export const TableWithAllSettings: Story = {
    args: {
        isSelectable: true,
        isSortable: true,
        isDraggable: true,
        isWrapped: false,
        isSearchable: true,
        isActionButton: true,
        actionButtons: [
            {
                icon: 'visibility',
                label: 'View',
                color: 'primary',
                onClick: action('View clicked'),
            },
            {
                icon: 'edit',
                label: 'Edit',
                color: 'primary',
                onClick: action('Edit clicked'),
            },
            {
                icon: 'delete',
                label: 'Delete',
                color: 'danger',
                onClick: action('Delete clicked'),
            },
        ],
        data: [
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
        ],
        columns: ['name', 'job', 'date'],
    },
};

export const TableWithAllSettingsAndWrapped: Story = {
    args: {
        isSelectable: true,
        isSortable: true,
        isDraggable: true,
        isWrapped: true,
        isSearchable: true,
        isActionButton: true,
        actionButtons: [
            {
                icon: 'visibility',
                label: 'View',
                color: 'primary',
                onClick: action('View clicked'),
            },
            {
                icon: 'edit',
                label: 'Edit',
                color: 'primary',
                onClick: action('Edit clicked'),
            },
            {
                icon: 'delete',
                label: 'Delete',
                color: 'danger',
                onClick: action('Delete clicked'),
            },
        ],
        data: [
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
        ],
        columns: ['name', 'job', 'date'],
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

// CheckboxGroup.play = async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const commentsCheckbox = await canvas.getByLabelText('Comments');
//     const candidatesCheckbox = await canvas.getByLabelText('Candidates');
//     const offersCheckbox = await canvas.getByLabelText('Offers');

//     await userEvent.click(commentsCheckbox);
//     await userEvent.click(candidatesCheckbox);
//     await userEvent.click(offersCheckbox);
// };

// SingleCheckbox.play = async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const newsletterCheckbox = await canvas.getByLabelText('Newsletter');

//     await userEvent.click(newsletterCheckbox);
// };
