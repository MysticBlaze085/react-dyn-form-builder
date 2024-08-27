import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ContentChild, TemplateRef } from '@angular/core';

import { ImperativeObservable } from '../../utils';

@Component({
    selector: 'adk-expansion-panel',
    standalone: true,
    imports: [CommonModule, AsyncPipe],
    template: `
        <div class="relative mb-3">
            <h6 class="mb-0">
                <button
                    class="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500"
                    (click)="togglePanel()"
                >
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <i
                        class="absolute right-0 pt-1 text-base transition-transform fa fa-chevron-down"
                        [ngClass]="{ 'rotate-180': isOpen.change$ | async }"
                    ></i>
                </button>
            </h6>
            <div
                class="overflow-hidden transition-all duration-300 ease-in-out"
                [ngClass]="{
                    'h-0 opacity-0': (isOpen.change$ | async) === false,
                    'h-auto opacity-100': isOpen.change$ | async
                }"
            >
                <div class="p-4 text-sm leading-normal text-blue-gray-500/80">
                    <ng-container *ngTemplateOutlet="bodyTemplate"></ng-container>
                </div>
            </div>
        </div>
    `,
})
export class AdkExpansionPanelComponent {
    isOpen = new ImperativeObservable(false);

    @ContentChild('expansionPanelHeader') headerTemplate!: TemplateRef<any>;
    @ContentChild('expansionPanelBody') bodyTemplate!: TemplateRef<any>;

    togglePanel(): void {
        this.isOpen.value = !this.isOpen.value;
    }
}
