import { CheckboxItem, TwCheckboxComponent } from './tw-checkbox.component';
import { Meta, StoryObj, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { userEvent, within } from '@storybook/test';

const meta: Meta<TwCheckboxComponent> = {
    title: 'TailwindUI/Field/Types/Checkbox',
    component: TwCheckboxComponent,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [TwCheckboxComponent],
        }),
        componentWrapperDecorator(
            (story) => `<div style="margin: 3em; display: flex; justify-content: center; align-items: center">
              <div style="width: '80%'; margin: '0 auto'">
              ${story}
              </div>
            </div>`
        ),
    ],
    args: {},
};

export default meta;

type Story = StoryObj<TwCheckboxComponent>;

export const SingleCheckbox: Story = {
    args: {
        checkbox: { id: 'newsletter', name: 'Newsletter', description: 'Get notified when there is a new newsletter.' } as CheckboxItem,
    },
};

export const CheckboxGroup: Story = {
    args: {
        checkbox: [
            { id: 'comments', name: 'Comments', description: 'Get notified when someone posts a comment on a posting.' },
            { id: 'candidates', name: 'Candidates', description: 'Get notified when a candidate applies for a job.' },
            { id: 'offers', name: 'Offers', description: 'Get notified when a candidate accepts or rejects an offer.' },
        ] as CheckboxItem[],
    },
};

CheckboxGroup.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const commentsCheckbox = await canvas.getByLabelText('Comments');
    const candidatesCheckbox = await canvas.getByLabelText('Candidates');
    const offersCheckbox = await canvas.getByLabelText('Offers');

    await userEvent.click(commentsCheckbox);
    await userEvent.click(candidatesCheckbox);
    await userEvent.click(offersCheckbox);
};

SingleCheckbox.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const newsletterCheckbox = await canvas.getByLabelText('Newsletter');

    await userEvent.click(newsletterCheckbox);
};
