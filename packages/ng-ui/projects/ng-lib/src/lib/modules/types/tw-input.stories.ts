import { InputItem, TwInputComponent } from './tw-input.component';
import { Meta, StoryObj, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { userEvent, within } from '@storybook/test';

import { ReactiveFormsModule } from '@angular/forms';

const meta: Meta<TwInputComponent> = {
    title: 'TailwindUI/Field/Types/Input',
    component: TwInputComponent,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [TwInputComponent, ReactiveFormsModule],
        }),
        componentWrapperDecorator(
            (story) => `<div style="width:80%; margin: 3em; display: flex; justify-content: center; align-items: center">
              ${story}
            </div>`
        ),
    ],
    args: {},
};

export default meta;

type Story = StoryObj<TwInputComponent>;

export const Input: Story = {
    args: {
        input: {
            id: 'newsletter',
            name: 'Newsletter',
            placeholder: 'Newsletter Placeholder',
            hint: 'Get notified when there is a new newsletter.',
            value: '',
            ariaInvalid: false,
            errorMessage: '',
        } as InputItem,
    },
};

export const InputWithError: Story = {
    args: {
        input: {
            id: 'newsletter',
            name: 'Newsletter',
            placeholder: 'Newsletter Placeholder',
            hint: 'Get notified when there is a new newsletter.',
            value: '',
            required: true,
            errorMessage: 'This field is required.',
        } as InputItem,
    },
};

export const InputWithErrorPlay: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = await canvas.getByPlaceholderText('Newsletter Placeholder');
        await userEvent.type(input, ''); // Leave input empty to trigger error
        await userEvent.tab(); // Trigger blur event
        const errorText = await canvas.getByText('This field is required.');
        expect(errorText).toBeVisible();
    },
};
