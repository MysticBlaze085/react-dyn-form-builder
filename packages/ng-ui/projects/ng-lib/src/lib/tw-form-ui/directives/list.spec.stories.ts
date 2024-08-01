import type { Meta, StoryObj } from '@storybook/angular';

import { AdkList } from './list';
import { Component } from '@angular/core';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

@Component({
  standalone: true,
  selector: 'adk-host',
  template: ``,
  hostDirectives: [AdkList],
})
class ListDirectiveComponent {}

const meta: Meta<ListDirectiveComponent> = {
  component: ListDirectiveComponent,
  title: '(TW) Angular UI / Directives / List',
};
export default meta;
type Story = StoryObj<ListDirectiveComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/list.spec works!/gi)).toBeTruthy();
  },
};
