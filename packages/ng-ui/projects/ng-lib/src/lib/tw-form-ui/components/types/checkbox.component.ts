import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Field } from '../../models';

@Component({
    standalone: true,
    selector: 'adk-checkbox',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        @if (options.length > 0) { @for (option of options; track (option.id)) {
        <div [ngClass]="class" class="relative flex gap-x-3 mt-2">
            <div class="flex h-6 items-center">
                <input
                    type="checkbox"
                    [checked]="formControl[field.key][option.id].value"
                    [name]="option.id"
                    [id]="option.id"
                    [value]="option.value"
                    [formControl]="formControl[field.key][option.id]"
                    [ngClass]="inputClass"
                    (change)="onCheckChange($event, option.id)"
                />
            </div>
            <div class="text-sm leading-6">
                <label [for]="option.id" [ngClass]="labelClass">{{ option.label }}</label>
                <p *ngIf="option.description" class="text-gray-500">{{ option.description }}</p>
            </div>
        </div>
        }} @else {
        <div class="inline-flex items-center">
            <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                <input
                    type="checkbox"
                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    id="check"
                />
                <span
                    class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="1"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </span>
            </label>
            <label class="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="check"> </label>
        </div>
        <!-- <div class="relative flex items-start">
            <div class="flex h-6 items-center">
                <label
                    class="relative flex items-center cursor-pointer p-3 rounded-full"
                    [for]="field.key"
                    style="position: relative; overflow: hidden;"
                >
                    <input
                        type="checkbox"
                        class="peer relative appearance-none border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-gray-900 checked:border-gray-900 checked:before:bg-gray-900 w-4 h-4"
                        [id]="field.key"
                        [name]="field.key"
                        [formControl]="formControl[field.key]"
                    />
                    <span
                        class="text-white absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="1"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </span>
                </label>
            </div>
            <div class="ml-3 text-sm leading-6">
                <label [for]="field.key" [ngClass]="labelClass">{{ label }}</label>
                <p *ngIf="description" class="text-gray-500">{{ description }}</p>
            </div>
        </div> -->
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
export class CheckboxComponent implements OnChanges {
    @Input() field!: Field;
    formControl: { [key: string]: AbstractControl | any } = {};

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
        return this.field?.description;
    }

    get placeholder() {
        return this.field.placeholder ?? '';
    }

    get class() {
        return this.props?.class ?? 'sm:col-span-3';
    }

    get labelClass() {
        return this.props?.labelClass ?? 'font-medium text-gray-900';
    }

    get inputClass() {
        return this.props?.inputClass ?? 'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600';
    }

    ngOnChanges({ field }: SimpleChanges): void {
        if (field) {
            this.field = field.currentValue;
            this.initFormControl();
        }
    }

    private initFormControl(): void {
        this.formControl[this.field.key] = this.field.formControl;
    }

    onCheckChange(event: any, id: any) {
        if (!this.formControl[this.field.key][id].value) {
            this.formControl[this.field.key][id].patchValue('');
            return;
        }
        try {
            const parseValue = JSON.parse(event.target.value); // Assuming event.target.value contains JSON data
            this.formControl[this.field.key][id].patchValue(parseValue);
            // Continue with your logic using the parsed JSON data
        } catch (error) {
            console.error('Error parsing JSON:', error);
            // Handle the parsing error, such as logging or displaying an error message
        }
    }
}
