import type { Meta, StoryObj } from '@storybook/react';

import TextareaFieldControl from '../TextareaField';

const meta = {
    title: 'Material-TW/Field/Types/TextareaField',
    component: TextareaFieldControl,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        // layout: 'fullscreen',
    },
    args: {},
} as Meta<typeof TextareaFieldControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        handler: () => {},
        meta: {
            label: 'Label',
            required: false,
            disabled: false,
        },
    },
};

// export const LoggedOut: Story = {};
