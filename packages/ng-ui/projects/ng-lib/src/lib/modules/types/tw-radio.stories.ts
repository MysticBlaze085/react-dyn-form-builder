import { Meta, StoryObj, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { userEvent, within } from '@storybook/test';

import { FieldItem } from './base.component';
import { TwRadioComponent } from './tw-radio.component';

const meta: Meta<TwRadioComponent> = {
    title: 'TailwindUI/Field/Types/Radio',
    component: TwRadioComponent,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [TwRadioComponent],
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

type Story = StoryObj<TwRadioComponent>;

export const SingleRadio: Story = {
    args: {
        radio: { id: 'newsletter', name: 'Newsletter', description: 'Get notified when there is a new newsletter.' } as FieldItem,
    },
};

export const RadioGroup: Story = {
    args: {
        radio: [
            { id: 'comments', name: 'Comments', description: 'Get notified when someone posts a comment on a posting.' },
            { id: 'candidates', name: 'Candidates', description: 'Get notified when a candidate applies for a job.' },
            { id: 'offers', name: 'Offers', description: 'Get notified when a candidate accepts or rejects an offer.' },
        ] as FieldItem[],
    },
};

RadioGroup.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const commentsRadio = await canvas.getByLabelText('Comments');
    const candidatesRadio = await canvas.getByLabelText('Candidates');
    const offersRadio = await canvas.getByLabelText('Offers');

    await userEvent.click(commentsRadio);
    await userEvent.click(candidatesRadio);
    await userEvent.click(offersRadio);
};

SingleRadio.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const newsletterRadio = await canvas.getByLabelText('Newsletter');

    await userEvent.click(newsletterRadio);
};
