import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
    selector: 'tw-card',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div
            [ngClass]="isHeaderWrapped ? 'gap-4' : ''"
            class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-md bg-clip-border"
        >
            <div [ngClass]="isHeaderWrapped ? 'p-6 pb-1 gap-4' : ''" class="flex flex-col">
                <ng-content select=".adk-card-header"></ng-content>
                <ng-content select=".adk-card-subtitle"></ng-content>
                <ng-content select=".adk-card-body"></ng-content>
            </div>
            <div [ngClass]="isFooterWrapped ? 'p-6 pt-0' : ''">
                <ng-content select=".adk-card-footer"></ng-content>
            </div>
        </div>
    `,
})
export class TwCardComponent implements OnChanges {
    @Input() isHeaderWrapped = false;
    @Input() isFooterWrapped = false;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isHeaderWrapped']) this.isHeaderWrapped = changes['isHeaderWrapped'].currentValue;
        if (changes['isFooterWrapped']) this.isFooterWrapped = changes['isFooterWrapped'].currentValue;
    }
}
