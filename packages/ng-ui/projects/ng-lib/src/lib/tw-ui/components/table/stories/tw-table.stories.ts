import { Meta, StoryObj, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

import { TwDefaultTableComponent } from '../tw-table.component';

const meta: Meta<TwDefaultTableComponent> = {
    title: 'TailwindUI/Components/Tables/Default Table',
    component: TwDefaultTableComponent,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [TwDefaultTableComponent],
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

type Story = StoryObj<TwDefaultTableComponent>;

export const TableWithAllSettings: Story = {
    args: {
        isSelectable: true,
        isSortable: true,
        headers: ['Name', 'Job', 'Date'],
        actionColName: ' ',
        isDraggable: true,
        rows: [
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
        ],
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
