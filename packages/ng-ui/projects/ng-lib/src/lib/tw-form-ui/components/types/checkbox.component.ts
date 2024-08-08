import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

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
                    [checked]="formControl[field.key][option.id]?.value"
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
        } } @else {
        <div class="inline-flex items-center">
            <label class="relative flex items-center p-3 rounded-full cursor-pointer" for="checkbox">
                <input
                    type="checkbox"
                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    [checked]="formControl[field.key].value"
                    [name]="id"
                    [id]="id"
                    [value]="field.value"
                    [formControl]="formControl[field.key]"
                    [ngClass]="inputClass"
                    (change)="onCheckChange($event, id)"
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
export class CheckboxComponent implements OnChanges, AfterViewInit {
    @Input() field!: Field;
    @Input() isChecked?: boolean;
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
    formControl: { [key: string]: AbstractControl | any } = {};

    get id() {
        return `${this.field.id}`;
    }

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

    ngAfterViewInit(): void {
        //check if field has already been rendered
        if (this.formControl[this.field.key]) {
            return;
        } else {
            this.initFormControl();
        }
    }

    ngOnChanges({ field, isChecked }: SimpleChanges): void {
        if (field) {
            this.field = field.currentValue;
            if (this.formControl[this.field.key]) {
                return;
            } else {
                this.initFormControl();
            }
        }
        if (isChecked) {
            console.log('CheckboxComponent', isChecked.currentValue);
            this.formControl[this.field.key].patchValue(isChecked.currentValue);
        }
    }

    private initFormControl(): void {
        this.formControl[this.field.key] = this.field.formControl;
        if (this.options.length > 0) {
            this.options.forEach((option: any) => {
                this.formControl[this.field.key][option.id] = new FormControl('');
            });
        } else {
            this.formControl[this.field.key] = new FormControl(false);
        }
    }

    onCheckChange(event: any, id: any) {
        let value = event.target.checked;
        if (this.options.length > 0) {
            this.formControl[this.field.key][id].patchValue(value);
        } else {
            value = this.isChecked !== undefined ? this.isChecked : value;
            this.formControl[this.field.key].patchValue(value);
            console.log('CheckboxComponent', value, this.formControl[this.field.key].value);
        }
        this.valueChange.emit(this.field.value);
    }
}