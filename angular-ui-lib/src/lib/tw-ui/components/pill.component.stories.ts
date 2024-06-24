import { Component } from '@angular/core';
import { type Meta, type StoryObj } from '@storybook/angular';

import { CommonModule } from '@angular/common';
import { PillComponent } from './pill.component';

@Component({
  selector: 'storybook-button-wrapper',
  standalone: true,
  imports: [CommonModule, PillComponent],
  template: ` <adk-pill> This is a pill </adk-pill> `,
})
class PillWrapperComponent {}
const meta: Meta<PillWrapperComponent> = {
  component: PillWrapperComponent,
  title: '(TW) Angular UI / Components / Pill',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<PillWrapperComponent>;

export const Primary: Story = {
  args: {},
};
