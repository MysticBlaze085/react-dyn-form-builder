import { Component, Input } from '@angular/core';

import { ButtonComponent } from '../button.component';
import { CommonModule } from '@angular/common';
import { TwTypographyComponent } from './utils';

@Component({
    selector: 'tw-table-card-header',
    standalone: true,
    template: ` <div class="relative bg-clip-border mt-4 mx-4 bg-white text-gray-700 rounded-none overflow-visible">
        <div class="mb-2 flex items-center justify-between gap-8">
            <div>
                @if(title){
                <tw-typography
                    variant="h5"
                    color="blue-gray"
                    classStyle="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
                    >{{ title }}</tw-typography
                >
                } @if(subtitle){
                <tw-typography color="gray" classStyle="mt-1 font-normal">{{ subtitle }}</tw-typography>
                }
            </div>
            <div class="flex shrink-0 flex-col gap-2 sm:flex-row">
                @if(buttons && buttons.length > 0){
                <div *ngFor="let button of buttons" class="flex items-center gap-3 cursor-pointer" (click)="button.onClick()">
                    <adk-button color="{{ button.color }}" (click)="button.onClick()">
                        @if(button.icon){
                        <span class="material-symbols-outlined">{{ button.icon }}</span>
                        }
                        {{ button.label }}
                    </adk-button>
                </div>
                }
                <div class="flex items-center gap-3 cursor-pointer">
                    <!-- <tw-table-settings-dialog /> -->
                </div>
            </div>
        </div>
    </div>`,
    imports: [CommonModule, TwTypographyComponent, ButtonComponent],
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
            .material-symbols-outlined {
                font-size: 16px !important;
            }
        `,
    ],
})
export class TwTableCardHeaderComponent {
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() buttons: { label: string; onClick: () => void; color: string; icon: string }[] = [];
}
