import type { Meta, StoryObj } from '@storybook/angular';

import { AdkFields } from '../field';
import { Component } from '@angular/core';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

@Component({
    standalone: true,
    selector: 'adk-host',
    template: ``,
    hostDirectives: [AdkFields],
})
class FieldDirectiveComponent {}

const meta: Meta<FieldDirectiveComponent> = {
    component: FieldDirectiveComponent,
    title: '(TW) Angular UI / Directives / Form / Field',
};
export default meta;
type Story = StoryObj<FieldDirectiveComponent>;

export const Primary: Story = {
    args: {},
};

export const Heading: Story = {
    args: {},
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        expect(canvas.getByText(/field.spec works!/gi)).toBeTruthy();
    },
};
