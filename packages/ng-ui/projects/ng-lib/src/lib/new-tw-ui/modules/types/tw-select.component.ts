import { BaseComponent, FieldItem, OptionItem } from './base.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
    selector: 'tw-select',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div [ngClass]="width">
            <label id="listbox-label" class="block text-sm font-medium leading-6 text-gray-900">{{ getName(select) }}</label>
            <div class="relative mt-2">
                <button
                    type="button"
                    class="relative w-full min-w-[100px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                    (click)="toggleDropdown()"
                >
                    <span class="block truncate">{{ selectedOption?.label || 'Select an option' }}</span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                                fill-rule="evenodd"
                                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                </button>

                <ul
                    *ngIf="dropdownOpen"
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    tabindex="-1"
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-option-3"
                >
                    <li
                        *ngFor="let option of select.options; let i = index"
                        class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
                        [id]="'listbox-option-' + i"
                        role="option"
                        (click)="selectOption(option)"
                        (mouseenter)="highlightOption(i)"
                        (mouseleave)="highlightOption(-1)"
                        [ngClass]="{ 'bg-indigo-600 text-white': highlightedIndex === i, 'text-gray-900': highlightedIndex !== i }"
                    >
                        <span
                            class="block truncate"
                            [ngClass]="{
                                'font-semibold': selectedOption?.value === option.value,
                                'font-normal': selectedOption?.value !== option.value
                            }"
                            >{{ option.label }}</span
                        >
                        <span
                            *ngIf="selectedOption?.value === option.value"
                            class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"
                            [ngClass]="{ 'text-white': highlightedIndex === i, 'text-indigo-600': highlightedIndex !== i }"
                        >
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    `,
})
export class TwSelectComponent extends BaseComponent implements OnInit {
    @Input() select: FieldItem = {
        id: 'select',
        options: [],
        name: 'select',
        placeholder: 'select',
    };
    @Input() width: string = 'min-w-[200px]';
    override formControls: { [key: string]: FormControl } = {};

    selectedOption: any;
    dropdownOpen = false;
    highlightedIndex = -1;

    ngOnInit(): void {
        const item = this.select as FieldItem;
        const options = item.options ?? [];
        this.formControls[item.name] = new FormControl(item.value ?? '', this.getValidators(item));
        this.selectedOption = options.find((option) => option.value === item.value) || null;
    }

    toggleDropdown(): void {
        this.dropdownOpen = !this.dropdownOpen;
    }

    selectOption(option: OptionItem): void {
        this.selectedOption = option;
        this.formControls[this.select.name].setValue(option.value);
        this.dropdownOpen = false;
    }

    highlightOption(index: number): void {
        this.highlightedIndex = index;
    }
}
