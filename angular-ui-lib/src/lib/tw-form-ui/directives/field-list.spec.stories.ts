import type { Meta, StoryObj } from '@storybook/angular';

import { AdkFieldList } from './field-list';
/* eslint-disable @angular-eslint/component-class-suffix */
import { Component } from '@angular/core';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

@Component({
  standalone: true,
  selector: 'adk-host',
  template: ``,
  hostDirectives: [AdkFieldList],
})
class FieldListDirective {}

const meta: Meta<FieldListDirective> = {
  component: FieldListDirective,
  title: '(TW) Angular UI / Directives / Form / Field List',
};
export default meta;
type Story = StoryObj<FieldListDirective>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/field-list.spec works!/gi)).toBeTruthy();
  },
};
