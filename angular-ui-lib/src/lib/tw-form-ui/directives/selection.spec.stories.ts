import type { Meta, StoryObj } from '@storybook/angular';

import { AdkSelection } from './selection';
import { Component } from '@angular/core';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

@Component({
  standalone: true,
  selector: 'adk-host',
  template: ``,
  hostDirectives: [AdkSelection],
})
class SelectionDirectiveComponent {}

const meta: Meta<SelectionDirectiveComponent> = {
  component: SelectionDirectiveComponent,
  title: '(TW) Angular UI / Directives / Selection',
};
export default meta;
type Story = StoryObj<SelectionDirectiveComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/selection.spec works!/gi)).toBeTruthy();
  },
};
