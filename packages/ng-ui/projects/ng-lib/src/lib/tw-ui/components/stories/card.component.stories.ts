import { Component } from '@angular/core';
import { type Meta, type StoryObj } from '@storybook/angular';

import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/test';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card.component';

@Component({
    selector: 'storybook-card-wrapper',
    standalone: true,
    imports: [CommonModule, CardComponent],
    template: `
        <adk-card>
            <h5
                class="adk-card-header block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
            >
                UI/UX Review Check
            </h5>
            <p class="adk-card-content block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                Card content goes here
            </p>
            <button
                class="adk-card-footer align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
            >
                Read More
            </button>
        </adk-card>
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
