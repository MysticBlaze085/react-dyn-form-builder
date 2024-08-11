import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
    selector: 'tw-dialog',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if(isOpen) {
        <div
            class="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
        >
            <div class="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white text-gray-700 shadow-md">
                <ng-content></ng-content>
            </div>
        </div>
        }
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
export class DialogComponent {
    @Input() isOpen = false;
    @Output() isOpenChange = new EventEmitter<boolean>();

    closeDialog() {
        this.isOpen = false;
        this.isOpenChange.emit(this.isOpen);
    }
}
