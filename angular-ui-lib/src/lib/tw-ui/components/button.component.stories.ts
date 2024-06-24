import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type Meta, type StoryObj } from '@storybook/angular';

import { ButtonComponent } from './button.component';

import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/test';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-button-wrapper',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: ` <adk-button [disabled]="disabled" [color]="color" [variant]="variant"> Content for ng-content goes here </adk-button> `,
})
class ButtonWrapperComponent {
  @Input() disabled = false;
  @Input() variant: 'filled' | 'gradient' | 'outlined' | 'text' = 'filled';
  @Input() color: 'primary' | 'secondary' | 'success' | 'warn' | 'danger' = 'primary';
  @Output() handleButtonRouteLink = new EventEmitter();
}
const meta: Meta<ButtonWrapperComponent> = {
  component: ButtonWrapperComponent,
  title: '(TW) Angular UI / Components / Button',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ButtonWrapperComponent>;

export const Primary: Story = {
  args: {
    disabled: false,
    variant: 'filled',
    color: 'primary',
  },
};


export const Secondary: Story = {
  args: {
    disabled: false,
    variant: 'filled',
    color: 'secondary',
  },
};

export const Success: Story = {
  args: {
    disabled: false,
    variant: 'filled',
    color: 'success',
  },
};

export const Danger: Story = {
  args: {
    disabled: false,
    variant: 'filled',
    color: 'danger',
  },
};

export const Warn: Story = {
  args: {
    disabled: false,
    variant: 'filled',
    color: 'warn',
  },
};

export const ButtonActionsTesting: Story = {
  args: {
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvasElement.querySelector('adk-button');
    if (button) {
      await userEvent.click(button);
      expect(canvas.getByText(/Content for ng-content goes here/gi)).toBeTruthy();
    }
  },
};
