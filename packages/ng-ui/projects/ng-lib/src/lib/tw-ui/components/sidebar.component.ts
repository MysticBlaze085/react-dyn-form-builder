import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'adk-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <div class="relative flex h-[calc(100vh-3rem)] w-screen flex-row">
            @if (isExpanded) {
            <div
                class="relative flex h-full w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5"
            >
                <div class="p-4 mb-2">
                    <div class="flex flex-row">
                        <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            {{ title }}
                        </h5>
                        <span class="flex-auto"></span>
                        <button
                            type="button"
                            class="flex items-center w-[60px] p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                            (click)="toggleSidebar()"
                        >
                            <span class="material-symbols-outlined"> menu </span>
                        </button>
                    </div>
                </div>
                <nav class="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                    @for (nav of navigation; track nav.link) {
                    <div
                        role="button"
                        class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                        [routerLink]="[nav.link]"
                        [routerLinkActive]="'active'"
                    >
                        <div class="grid mr-4 place-items-center">
                            <span class="material-symbols-outlined"> {{ nav.icon }} </span>
                        </div>
                        {{ nav.text | titlecase }}
                    </div>
                    }
                </nav>
            </div>
            } @else {
            <div
                class="relative flex h-full w-full max-w-[5rem] flex-col rounded-xl bg-white bg-clip-border p-2 text-gray-700 shadow-xl shadow-blue-gray-900/5"
            >
                <div class="flex min-w-[60px] flex-col gap-1 p-2 font-sans text-center font-normal text-blue-gray-700">
                    <button
                        type="button"
                        class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                        (click)="toggleSidebar()"
                    >
                        <span class="material-symbols-outlined"> arrow_forward_ios </span>
                    </button>
                </div>
                <nav class="flex min-w-[60px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                    @for (nav of navigation; track nav.link) {
                    <div
                        role="button"
                        class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                        [routerLink]="[nav.link]"
                        [routerLinkActive]="'active'"
                    >
                        <div class="grid mr-4 place-items-center">
                            <span class="material-symbols-outlined"> {{ nav.icon }} </span>
                        </div>
                    </div>
                    }
                </nav>
            </div>
            }
            <div class="relative h-full w-full">
                <ng-content [select]="'.sidebar-content'"></ng-content>
            </div>
        </div>
    `,
})
export class SidebarComponent implements OnChanges {
    @Input() title = 'Sidebar';
    @Input() navigation: { link: string; icon: string; text: string }[] = [];

    isExpanded = true;
    toggleSidebar = () => {
        ('SidebarComponent: toggleSidebar');
        this.isExpanded = !this.isExpanded;
    };

    ngOnChanges({ title, navigation }: SimpleChanges) {
        if (title) this.title = title.currentValue;
        if (navigation) this.navigation = navigation.currentValue;
    }
}
