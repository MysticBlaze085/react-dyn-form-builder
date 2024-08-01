import { Meta, StoryObj, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { userEvent, within } from '@storybook/test';

import { FieldItem } from '../base.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TwInputComponent } from '../tw-input.component';

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
        } as FieldItem,
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
        } as FieldItem,
    },
};

InputWithError.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.getByPlaceholderText('Newsletter Placeholder');
    await userEvent.click(input); // Focus on the input
    await userEvent.tab(); // Move focus away to trigger blur event
    await canvas.getByText('This field is required.'); // Check for error text presence
};
