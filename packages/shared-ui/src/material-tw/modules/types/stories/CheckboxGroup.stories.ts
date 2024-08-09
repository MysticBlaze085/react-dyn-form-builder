import type { Meta, StoryObj } from '@storybook/react';
import CheckboxGroup from '../CheckboxGroup';

const meta = {
    title: 'Material-TW/Field/Types/CheckboxGroup',
    component: CheckboxGroup,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        // layout: 'fullscreen',
    },
    args: {},
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        handler: () => {},
        meta: {
            items: [
                { id: '1', value: 'React.js' },
                { id: '2', value: 'Vue.js' },
                { id: '3', value: 'Svelte' },
            ],
        },
    },
};
