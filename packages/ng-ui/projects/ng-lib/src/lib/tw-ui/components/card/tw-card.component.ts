import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'tw-card',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <div class="p-6">
                <ng-content
                    select="[tw-card-header]"
                    class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
                ></ng-content>
                <ng-content
                    select="[tw-card-body]"
                    class="block font-sans text-base antialiased font-light leading-relaxed text-inherit"
                ></ng-content>
            </div>
            <ng-content select="[tw-card-footer]" class="p-6 pt-0"></ng-content>
        </div>
    `,
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `,
    ],
})
export class TwCardComponent {}
