import type { Meta, StoryObj } from '@storybook/react';

import TextFieldControl from '../TextField';

const meta = {
    title: 'Material-TW/Field/Types/TextField',
    component: TextFieldControl,
    tags: ['autodocs'],
    parameters: {
        // layout: 'fullscreen',
    },
    args: {
        handler: () => {}, // Provide default props
        meta: {
            label: 'Label', // Provide default props
        },
    },
} as Meta<typeof TextFieldControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        handler: () => {},
        meta: {
            label: 'Label',
        },
    },
};

// export const LoggedOut: Story = {};
