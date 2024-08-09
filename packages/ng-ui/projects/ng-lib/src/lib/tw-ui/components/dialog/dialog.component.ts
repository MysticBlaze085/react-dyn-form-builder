import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
    selector: 'tw-dialog',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div
            *ngIf="isOpen"
            class="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
        >
            <div class="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white text-gray-700 shadow-md">
                <div class="flex flex-col gap-4 p-6">
                    <h4 class="text-2xl font-semibold text-blue-gray-900">{{ title }}</h4>
                    <p class="text-base text-gray-700">{{ content }}</p>
                    <ng-content></ng-content>
                </div>
                <div class="p-6 pt-0">
                    <button class="w-full rounded-lg bg-gray-900 py-3 px-6 text-xs font-bold uppercase text-white" (click)="closeDialog()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `,
})
export class DialogComponent implements OnChanges {
    @Input() isOpen = false;
    @Input() title = '';
    @Input() content = '';
    @Output() isOpenChange = new EventEmitter<boolean>();

    ngOnChanges(changes: SimpleChanges) {
        if (changes['isOpen']) this.isOpen = changes['isOpen'].currentValue;
        if (changes['title']) this.title = changes['title'].currentValue;
        if (changes['content']) this.content = changes['content'].currentValue;
    }

    closeDialog() {
        this.isOpen = !this.isOpen;
        this.isOpenChange.emit(this.isOpen);
    }
}
