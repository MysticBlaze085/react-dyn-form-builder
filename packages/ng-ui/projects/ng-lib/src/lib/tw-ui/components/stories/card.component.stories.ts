import { Component } from '@angular/core';
import { type Meta, type StoryObj } from '@storybook/angular';

import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/test';
import { CommonModule } from '@angular/common';
import { TwCardComponent } from '../card/tw-card.component';
import { ButtonComponent } from '../button.component';

@Component({
    selector: 'storybook-card-wrapper',
    standalone: true,
    imports: [CommonModule, TwCardComponent, ButtonComponent],
    template: `
        <tw-card>
            <h5
                class="adk-card-header block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
            >
                UI/UX Review Check
            </h5>
            <p class="adk-card-subtitle block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                Card content goes here
            </p>
            <div class="adk-card-body">Content for ng-content goes here</div>
            <div class="adk-card-footer">
                <adk-button> Read More </adk-button>
            </div>
        </tw-card>
    `,
})
class CardWrapperComponent {}
const meta: Meta<CardWrapperComponent> = {
    component: CardWrapperComponent,
    title: '(TW) Angular UI / Components / Card',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CardWrapperComponent>;

export const Primary: Story = {
    args: {},
};

export const CardActionsTesting: Story = {
    args: {
        disabled: false,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const card = canvasElement.querySelector('adk-card');
        if (card) {
            await userEvent.click(card);
            expect(canvas.getByText(/Content for ng-content goes here/gi)).toBeTruthy();
        }
    },
};
