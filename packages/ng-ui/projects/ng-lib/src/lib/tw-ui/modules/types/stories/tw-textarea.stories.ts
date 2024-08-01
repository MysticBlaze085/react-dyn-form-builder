import { Meta, StoryObj, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { userEvent, within } from '@storybook/test';

import { FieldItem } from '../base.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TwTextareaComponent } from '../tw-textarea.component';

const meta: Meta<TwTextareaComponent> = {
    title: 'TailwindUI/Field/Types/Textarea',
    component: TwTextareaComponent,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [TwTextareaComponent, ReactiveFormsModule],
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

type Story = StoryObj<TwTextareaComponent>;

export const Textarea: Story = {
    args: {
        input: {
            id: 'comment',
            name: 'comment',
            placeholder: 'Comment Placeholder',
            hint: 'Comment hint message.',
            value: '',
            ariaInvalid: false,
            errorMessage: '',
        } as FieldItem,
    },
};

export const TextareaWithError: Story = {
    args: {
        input: {
            id: 'comment',
            name: 'comment',
            placeholder: 'Comment Placeholder',
            hint: 'Comment hint message.',
            value: '',
            required: true,
            errorMessage: 'This field is required.',
        } as FieldItem,
    },
};

TextareaWithError.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.getByPlaceholderText('Comment Placeholder');
    await userEvent.click(input); // Focus on the input
    await userEvent.tab(); // Move focus away to trigger blur event
    await canvas.getByText('This field is required.'); // Check for error text presence
};
