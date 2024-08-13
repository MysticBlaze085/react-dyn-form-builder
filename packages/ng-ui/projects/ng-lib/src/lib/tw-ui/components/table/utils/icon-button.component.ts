import { Component } from '@angular/core';

@Component({
    selector: 'adk-icon-button',
    standalone: true,
    imports: [],
    template: `
        <button
            class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
            type="button"
        >
            <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    class="h-5 w-5"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg
            ></span>
        </button>
    `,
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
})
export class IconButtonComponent {}
