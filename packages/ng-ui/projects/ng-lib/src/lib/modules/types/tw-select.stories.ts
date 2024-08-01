import { Meta, StoryObj, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { expect, userEvent, within } from '@storybook/test';

import { FieldItem } from './base.component';
import { TwSelectComponent } from './tw-select.component';

const meta: Meta<TwSelectComponent> = {
    title: 'TailwindUI/Field/Types/Select',
    component: TwSelectComponent,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [TwSelectComponent],
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

type Story = StoryObj<TwSelectComponent>;

export const Select: Story = {
    args: {
        select: {
            id: 'newsletter',
            name: 'Newsletter',
            description: 'Get notified when there is a new newsletter.',
            options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
            ],
        } as FieldItem,
    },
};

Select.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const newsletterSelect = await canvas.getByRole('combobox', { name: /Newsletter/i });

    // Open the dropdown
    await userEvent.click(newsletterSelect);

    // Select the 'Yes' option
    const yesOption = await canvas.getByRole('option', { name: /Yes/i });
    await userEvent.click(yesOption);

    // Verify the FormControl value is updated
    const formControlValue = (newsletterSelect as HTMLSelectElement).value;
    expect(formControlValue).toBe('yes');
};
