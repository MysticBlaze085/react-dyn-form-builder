import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Field } from '../../models';

@Component({
    standalone: true,
    selector: 'adk-email-input',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        @if (field) {
        <div [ngClass]="class">
            <div class="relative w-full min-w-[200px] h-10">
                <input
                    type="email"
                    [formControl]="formControl[field.key]"
                    [pattern]="pattern"
                    [placeholder]="''"
                    [id]="field.key"
                    [autocomplete]="autocomplete"
                    [ngClass]="formControl[field.key].invalid && formControl[field.key].touched ? errorClass : inputClass"
                    [required]="required"
                    class="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-200 focus:border-gray-900"
                />
                <label
                    class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-200 peer-focus:before:!border-gray-900 after:border-gray-200 peer-focus:after:!border-gray-900"
                    style="z-index: 1;"
                >
                    {{ label }}
                </label>
            </div>
            @if (description && !formControl[field.key].touched){
            <p *ngIf="description" class="mt-3 text-sm leading-6 text-gray-600">
                {{ description }}
            </p>
            } @else {
            <div *ngIf="formControl[field.key].invalid && formControl[field.key].touched" class="text-red-500 text-xs mt-1">
                <div *ngIf="formControl[field.key].errors['required']">{{ label ?? 'field' }} is required</div>
                <div *ngIf="formControl[field.key].errors['minlength']">
                    Must be at least
                    {{ formControl[field.key].errors['minlength'].requiredLength }}
                </div>
            </div>
            }
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
export class EmailComponent implements OnChanges {
    @Input() field!: Field;
    formControl: { [key: string]: AbstractControl | any } = {};
    errorClass = `${this.inputClass} mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500`;

    get props() {
        return this.field?.props;
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

    get errorMessage() {
        return this.props?.errorMessage ?? 'Invalid pattern entered';
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
        return 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6';
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
}
