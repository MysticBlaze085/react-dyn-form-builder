import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

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
                class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-500 border-t-transparent"
                aria-expanded="true"
                aria-haspopup="listbox"
                role="combobox"
                aria-controls=":r1l:"
                (click)="toggleDropdown()"
            >
                <span class="absolute top-2/4 -translate-y-2/4 left-3 pt-0.5" [value]="field.value">{{ field.value }}</span>
                <div
                    class="grid place-items-center absolute top-2/4 right-2 pt-px w-5 h-5 text-blue-gray-400 rotate-0 -translate-y-2/4 transition-all rotate-180 mt-px"
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
                class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal transition-all -top-1.5 before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 before:rounded-tl-md before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 after:rounded-tr-md after:pointer-events-none after:transition-all peer-disabled:after:border-transparent text-[11px] peer-disabled:text-transparent before:border-t-2 before:border-l-2 after:border-t-2 after:border-r-2 leading-tight text-blue-500 before:border-blue-500 after:border-blue-500"
            >
                {{ label }}
            </label>
            @if (isOpen) {
            <ul
                tabindex="-1"
                role="listbox"
                class="w-full max-h-96 bg-white p-3 border border-blue-gray-50 rounded-md shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 overflow-auto focus:outline-none"
                style="position: absolute; top: -169px; left: 0px; overflow: auto; opacity: 1; transform-origin: center top 0px; transform: scale(1); width: 200px; z-index: 99;"
                id=":r1l:"
                aria-orientation="vertical"
            >
                @for (option of options; track $index) {
                <li
                    [id]="'material-tailwind-select-' + option.value"
                    role="option"
                    class="pt-[9px] pb-2 px-3 rounded-md leading-tight cursor-pointer select-none hover:bg-blue-gray-50 focus:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900 outline outline-0 transition-all"
                    [ngClass]="{ 'bg-blue-gray-50': option.value === field.value }"
                    [attr.tabindex]="option.value === field.value ? 0 : -1"
                    [attr.aria-selected]="option.value === field.value"
                    (click)="selectOption(option.value)"
                >
                    {{ option.label }}
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
            }
        `,
    ],
})
export class SelectComponent implements OnChanges {
    @Input() field!: Field;
    @Output() fieldValueChange = new EventEmitter<string>();
    formControl: { [key: string]: AbstractControl | any } = {};
    errorClass = `${this.inputClass} mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500`;
    isOpen = false;

    get props() {
        return this.field?.props;
    }

    get options() {
        return this.props?.options ?? [];
    }

    get autocomplete() {
        return this.props?.autocomplete ?? 'off';
    }
    get label() {
        return this.field.label;
    }

    get description() {
        return this.field.description;
    }

    get placeholder() {
        return this.field.placeholder ?? '';
    }

    get class() {
        return this.props?.class ?? 'sm:col-span-3';
    }

    get labelClass() {
        return this.props?.labelClass ?? 'block text-sm font-medium leading-6 text-gray-900';
    }

    get pattern() {
        return this.props?.pattern ?? '';
    }

    get required() {
        return this.props?.required ?? true;
    }

    get inputClass() {
        if (this.props && this.props.inputClass) {
            return this.props.inputClass;
        }
        return 'block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6';
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
    }

    selectOption(value: string) {
        this.field.value = value;
        this.formControl[this.field.key].patchValue(value);
        this.isOpen = false;
    }

    emitValueChange(value: string) {
        this.fieldValueChange.emit(value);
    }
}
