import { type Meta, type StoryObj } from '@storybook/angular';

import { FieldBuilder } from '../../models';
import { FieldsComponent } from '../fields.component';

// import { within } from '@storybook/testing-library';
// import { expect } from '@storybook/jest';

const meta: Meta<FieldsComponent> = {
    component: FieldsComponent,
    title: '(TW) Angular UI / Components / Form / Fields',
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<FieldsComponent>;

export const Primary: Story = {
    args: {
        fieldConfig: [
            FieldBuilder.createField('text', 'firstName', '', 'First Name', 'Enter first name', {
                class: 'sm:col-span-3',
                required: true,
                minLength: 3,
            }),
            FieldBuilder.createField('text', 'lastName', '', 'Last Name', 'Enter last name', {
                class: 'sm:col-span-3',
                required: true,
                minLength: 3,
            }),
            FieldBuilder.createField('password', 'password', '', 'Password', 'Enter password', {
                class: 'sm:col-span-3',
                required: true,
                minLength: 3,
            }),
            FieldBuilder.createField('textarea', 'about', '', 'About', 'Enter about', {
                class: 'sm:col-span-3',
                required: true,
                minLength: 3,
            }),
            FieldBuilder.createOptionsField(
                'checkbox',
                'checkbox',
                'Checkbox',
                'checkbox place holder',
                [
                    {
                        value: 'optionOne',
                        label: 'Option One',
                        id: '1',
                        description: 'Option one description',
                    },
                    {
                        value: 'optionTwo',
                        label: 'Option Two',
                        id: '2',
                        description: 'Option two description',
                    },
                ],
                {
                    required: true,
                }
            ),
            FieldBuilder.createField('radio', 'radio', '', 'radio', 'radio', {
                class: 'sm:col-span-3',
                required: true,
                minLength: 3,
                options: [
                    {
                        value: 'optionOne',
                        label: 'Option One',
                        id: '1',
                    },
                    {
                        value: 'optionTwo',
                        label: 'Option Two',
                        id: '2',
                    },
                ],
            }),
            FieldBuilder.createField('select', 'select', '', 'Select', 'Select', {
                class: 'sm:col-span-3',
                required: true,
                minLength: 3,
                options: [
                    {
                        value: 'optionOne',
                        label: 'Option One',
                        id: '1',
                    },
                    {
                        value: 'optionTwo',
                        label: 'Option Two',
                        id: '2',
                    },
                    {
                        value: 'optionThree',
                        label: 'Option Three',
                        id: '3',
                    },
                ],
            }),
            FieldBuilder.createField('select', 'multi-select', '', 'Multi Select', 'Multi Select', {
                isMultipleTag: true,
                class: 'sm:col-span-3',
                required: true,
                minLength: 3,
                options: [
                    {
                        value: 'optionOne',
                        label: 'Option One',
                        id: '1',
                    },
                    {
                        value: 'optionTwo',
                        label: 'Option Two',
                        id: '2',
                    },
                    {
                        value: 'optionThree',
                        label: 'Option Three',
                        id: '3',
                    },
                ],
            }),
        ],
        wrapperClass: 'mt-2 grid grid-cols-1 gap-x-4 gap-y-4 p-4',
    },
};

// export const Heading: Story = {
//   args: {
//     fieldConfig: [],
//     wrapperClass: 'mt-2 grid grid-cols-3 gap-x-4 gap-y-4 p-4',
//   },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     expect(canvas.getByText(/fields works!/gi)).toBeTruthy();
//   },
// };
