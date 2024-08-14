import { Meta, StoryObj } from '@storybook/angular';

import { TooltipButtonComponent } from '../tooltip-button.component';

const meta: Meta<TooltipButtonComponent> = {
    title: '(TW) Angular UI / Components / Tooltip Button',
    component: TooltipButtonComponent,
    decorators: [],
    argTypes: {
        tooltipText: { control: 'text' },
        buttonText: { control: 'text' },
        tooltipPlacement: {
            control: {
                type: 'select',
                options: ['top', 'bottom', 'left', 'right'],
            },
        },
        rippleLight: { control: 'boolean' },
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<TooltipButtonComponent>;

export const Default: Story = {
    args: {
        tooltipText: 'This is a tooltip',
        buttonText: 'Hover me',
        tooltipPlacement: 'top',
        rippleLight: true,
    },
};

export const BottomPlacement: Story = {
    args: {
        tooltipText: 'Tooltip at the bottom',
        buttonText: 'Hover me',
        tooltipPlacement: 'bottom',
        rippleLight: true,
    },
};

export const LeftPlacement: Story = {
    args: {
        tooltipText: 'Tooltip on the left',
        buttonText: 'Hover me',
        tooltipPlacement: 'left',
        rippleLight: true,
    },
};

export const RightPlacement: Story = {
    args: {
        tooltipText: 'Tooltip on the right',
        buttonText: 'Hover me',
        tooltipPlacement: 'right',
        rippleLight: true,
    },
};
