import type { Meta, StoryObj } from '@storybook/angular';

import { AdkHttpClient } from '../http-client';
import { Component } from '@angular/core';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

@Component({
    standalone: true,
    selector: 'adk-host',
    template: ``,
    hostDirectives: [{ directive: AdkHttpClient, inputs: ['adkUrl'] }],
})
class HttpClientDirectiveComponent {}

const meta: Meta<HttpClientDirectiveComponent> = {
    component: HttpClientDirectiveComponent,
    title: '(TW) Angular UI / Directives / Http Client',
};
export default meta;
type Story = StoryObj<HttpClientDirectiveComponent>;

export const Primary: Story = {
    args: {},
};

export const Heading: Story = {
    args: {},
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        expect(canvas.getByText(/http-client.spec works!/gi)).toBeTruthy();
    },
};
