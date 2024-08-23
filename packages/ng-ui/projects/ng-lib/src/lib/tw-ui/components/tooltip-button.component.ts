import { Component, Input } from '@angular/core';

import { AdkTooltipDirective } from '../../directives/tooltip';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tw-tooltip-button',
    standalone: true,
    imports: [CommonModule, AdkTooltipDirective],
    template: `
        <div class="relative">
            <button
                [attr.data-ripple-light]="rippleLight"
                [adkTooltip]="tooltipText"
                [tooltipPlacement]="tooltipPlacement"
                class="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
                {{ buttonText }}
            </button>
        </div>
    `,
    styles: [
        `
            :host {
                display: block;
            }
            .tooltip {
                position: absolute;
                z-index: 50;
                white-space: normal;
                break-words: break-word;
                border-radius: 0.375rem; /* rounded-lg */
                background-color: #000; /* bg-black */
                padding: 0.375rem 0.75rem; /* py-1.5 px-3 */
                font-family: 'sans-serif'; /* font-sans */
                font-size: 0.875rem; /* text-sm */
                font-weight: 400; /* font-normal */
                color: #fff; /* text-white */
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* shadow-md */
            }
        `,
    ],
})
export class TooltipButtonComponent {
    @Input() tooltipText: string = 'Material Tailwind';
    @Input() buttonText: string = 'Button';
    @Input() tooltipPlacement: string = 'top';
    @Input() rippleLight: boolean = true;
}
