import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'tw-card',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="relative flex flex-col gap-4 w-full h-full text-gray-700 bg-white shadow-md rounded-md bg-clip-border">
            <div class="px-6 pt-6 flex flex-col gap-4">
                <ng-content select=".adk-card-header"></ng-content>
                <ng-content select=".adk-card-subtitle"></ng-content>
                <ng-content select=".adk-card-body"></ng-content>
            </div>
            <div class="p-6 pt-0">
                <ng-content select=".adk-card-footer"></ng-content>
            </div>
        </div>
    `,
})
export class TwCardComponent {}
