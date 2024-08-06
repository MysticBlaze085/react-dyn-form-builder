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
        headers: ['Comments', 'Candidates', 'Offers'],
        actionColName: ' ',
        rows: [
            { comments: 'Great candidate', candidates: 'John Doe', offers: 'Accepted' },
            { comments: 'Needs improvement', candidates: 'Jane Smith', offers: 'Pending' },
            { comments: 'Excellent skills', candidates: 'Alice Johnson', offers: 'Rejected' },
            { comments: 'Average performance', candidates: 'Bob Brown', offers: 'Accepted' },
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
