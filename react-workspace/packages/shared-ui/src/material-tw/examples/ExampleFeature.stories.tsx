import type { Meta, StoryObj } from '@storybook/react';
import ExampleFeature from './ExampleFeature';

const meta = {
    title: 'Material-TW/Field/Example/ExampleFeature',
    component: ExampleFeature,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    args: {},
} satisfies Meta<typeof ExampleFeature>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
