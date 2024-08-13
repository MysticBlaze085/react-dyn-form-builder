import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { CommonModule } from '@angular/common';

@Component({
    selector: 'adk-expansion-panel',
    standalone: true,
    imports: [CommonModule],
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
                        [ngClass]="{ 'rotate-180': isOpen }"
                    ></i>
                </button>
            </h6>
            <div [@collapseAnimation]="isOpen ? 'open' : 'closed'" class="overflow-hidden transition-all duration-300 ease-in-out">
                <div class="p-4 text-sm leading-normal text-gray-500/80">
                    <ng-container *ngTemplateOutlet="bodyTemplate"></ng-container>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('collapseAnimation', [
            state('closed', style({ height: '0px', visibility: 'hidden' })),
            state('open', style({ height: '*', visibility: 'visible' })),
            transition('closed <=> open', animate('300ms ease-in-out')),
        ]),
    ],
})
export class AdkExpansionPanelComponent {
    @Input() isOpen: boolean = false;
    @ContentChild('expansionPanelHeader') headerTemplate!: TemplateRef<any>;
    @ContentChild('expansionPanelBody') bodyTemplate!: TemplateRef<any>;

    togglePanel(): void {
        this.isOpen = !this.isOpen;
    }
}
