import type { Meta, StoryObj } from '@storybook/angular';

import { AdkPagination } from './pagination';
import { Component } from '@angular/core';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

@Component({
  standalone: true,
  selector: 'adk-host',
  template: ``,
  hostDirectives: [AdkPagination],
})
class PaginationDirectiveComponent {}

const meta: Meta<PaginationDirectiveComponent> = {
  component: PaginationDirectiveComponent,
  title: '(TW) Angular UI / Directives / Pagination',
};
export default meta;
type Story = StoryObj<PaginationDirectiveComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/pagination.spec works!/gi)).toBeTruthy();
  },
};
