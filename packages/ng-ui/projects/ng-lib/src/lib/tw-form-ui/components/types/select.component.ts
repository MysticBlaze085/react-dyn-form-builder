import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Field } from '../../models';

@Component({
    standalone: true,
    selector: 'adk-select',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        @if (field) {
        <div class="relative w-full min-w-[200px] h-10">
            <button
                type="button"
                #dropdownButton
                class="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all border-2 text-sm px-3 py-2.5 rounded-[7px] border-gray-500 border-t-transparent"
                aria-expanded="true"
                aria-haspopup="listbox"
                role="combobox"
                aria-controls=":r1l:"
                (click)="toggleDropdown()"
            >
                <span class="absolute top-2/4 -translate-y-2/4 left-3 pt-0.5">{{ value | titlecase }}</span>
                <div
                    class="grid place-items-center absolute top-2/4 right-2 pt-px w-5 h-5 text-gray-400 rotate-0 -translate-y-2/4 transition-all rotate-180 mt-px"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </div>
            </button>
            <label
                class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal transition-all -top-1.5 before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 before:rounded-tl-md before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 after:rounded-tr-md after:pointer-events-none after:transition-all peer-disabled:after:border-transparent text-[11px] peer-disabled:text-transparent before:border-t-2 before:border-l-2 after:border-t-2 after:border-r-2 leading-tight text-gray-500 before:border-gray-500 after:border-gray-500"
            >
                {{ label | titlecase }}
            </label>
            @if (isOpen) {
            <ul
                #dropdownList
                tabindex="-1"
                role="listbox"
                class="w-full max-h-96 bg-white p-3 border border-gray-50 rounded-md shadow-lg shadow-gray-500/10 font-sans text-sm font-normal text-gray-500 overflow-auto focus:outline-none"
                [ngStyle]="{ top: dropdownTop, left: dropdownLeft, width: dropdownWidth, position: 'absolute', zIndex: '1000' }"
                id=":r1l:"
                aria-orientation="vertical"
            >
                @for (option of options; track $index) {
                <li
                    [id]="'material-tailwind-select-' + option.value"
                    role="option"
                    class="pt-[9px] pb-2 px-3 rounded-md leading-tight cursor-pointer select-none hover:bg-gray-50 focus:bg-gray-50 hover:bg-opacity-80 focus:bg-opacity-80 hover:text-gray-900 focus:text-gray-900 outline outline-0 transition-all"
                    [ngClass]="{ 'bg-gray-50': option.value === field.value }"
                    [attr.tabindex]="option.value === field.value ? 0 : -1"
                    [attr.aria-selected]="option.value === field.value"
                    (click)="selectOption(option.value)"
                >
                    {{ option.label | titlecase }}
                </li>
                }
            </ul>
            }
            <p *ngIf="description" class="mt-3 text-sm leading-6 text-gray-600">
                {{ description }}
            </p>
            <div *ngIf="formControl[field.key].invalid && formControl[field.key].touched" class="text-red-500 text-xs mt-1">
                <div *ngIf="formControl[field.key].errors['required']">{{ label ?? 'field' }} is required</div>
            </div>
        </div>
        }
    `,
    styles: [
        `
            :host {
                display: block;
                position: relative;
            }
        `,
    ],
})
export class SelectComponent implements OnChanges {
    @Input() field!: Field;
    @Output() fieldValueChange = new EventEmitter<string>();
    @ViewChild('dropdownButton') dropdownButton!: ElementRef;
    @ViewChild('dropdownList') dropdownList!: ElementRef;

    formControl: { [key: string]: AbstractControl | any } = {};
    isOpen = false;
    dropdownTop = '0px';
    dropdownLeft = '0px';
    dropdownWidth = '100%';

    get props() {
        return this.field?.props;
    }

    get options() {
        return this.props?.options ?? [];
    }

    get label() {
        return this.field.label;
    }

    get value(): string {
        return `${this.field.value}`;
    }

    get description() {
        return this.field.description;
    }

    ngOnChanges({ field }: SimpleChanges): void {
        if (field) {
            this.field = field.currentValue;
            this.initFormControl();
        }

        this.formControl[this.field.key].valueChanges.subscribe((value: string) => {
            this.emitValueChange(value);
        });
    }

    private initFormControl(): void {
        this.formControl[this.field.key] = this.field.formControl;
    }

    toggleDropdown() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.updateDropdownPosition();
        }
    }

    selectOption(value: string) {
        this.field.value = value;
        this.formControl[this.field.key].patchValue(value);
        this.isOpen = false;
    }

    emitValueChange(value: string) {
        this.fieldValueChange.emit(value);
    }

    private updateDropdownPosition() {
        const buttonRect = this.dropdownButton.nativeElement.getBoundingClientRect();
        this.dropdownTop = `${buttonRect.height}px`;
        this.dropdownLeft = `0px`;
        this.dropdownWidth = `${buttonRect.width}px`;
    }
}
