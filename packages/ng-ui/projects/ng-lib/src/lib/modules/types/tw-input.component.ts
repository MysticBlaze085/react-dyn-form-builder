import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface InputItem {
    id: string;
    name: string;
    placeholder: string;
    hint?: string;
    value?: string;
    ariaInvalid?: boolean;
    errorMessage?: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

@Component({
    selector: 'tw-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="relative flex items-start">
            <div class="flex h-6 items-center">
                <input
                    [id]="getInputId(input)"
                    [name]="getInputName(input)"
                    [placeholder]="getInputPlaceholder(input)"
                    [formControl]="formControls[getInputName(input)]"
                    (blur)="onBlur(getInputName(input))"
                    (change)="onChange(getInputName(input))"
                    type="text"
                    [ngClass]="{
                        'border-red-500 ring-red-500 placeholder-red-300': isError(input),
                        'border-gray-300 ring-gray-300 placeholder-gray-300': !isError(input)
                    }"
                    class="block w-full rounded-md py-1.5 pr-10 ring-1 ring-inset focus:ring-2 sm:text-sm sm:leading-6"
                />
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg *ngIf="isError(input)" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>
        </div>
        <p class="mt-2 text-sm text-red-600" [id]="getInputId(input) + '-error'" *ngIf="isError(input)">
            {{ getErrorMessage(input) }}
        </p>
    `,
})
export class TwInputComponent implements OnInit {
    @Input() input: InputItem = {
        id: 'default',
        name: 'default',
        placeholder: 'Default Example',
        hint: 'This is a default hint',
        value: '',
        ariaInvalid: true,
        errorMessage: 'This field is required.',
    };
    formControls: { [key: string]: FormControl } = {};

    ngOnInit(): void {
        const item = this.input;
        console.log('Item', item);
        this.formControls[item.name] = new FormControl(item.value ?? '', this.getValidators(item));
    }

    getInputId(input: InputItem): string {
        return input.id;
    }

    getInputName(input: InputItem): string {
        return input.name;
    }

    getInputPlaceholder(input: InputItem): string {
        return input.placeholder ?? new TitleCasePipe().transform(input.name);
    }

    getInputValue(input: InputItem): string {
        return input.value ?? '';
    }

    getAriaInvalid(input: InputItem): boolean {
        const control = this.formControls[input.name];
        return control && control.invalid && (control.dirty || control.touched);
    }

    getErrorMessage(input: InputItem): string {
        const control = this.formControls[input.id];
        if (control) {
            if (control.errors?.['required']) {
                return 'This field is required.';
            } else if (control.errors?.['minlength']) {
                return `Minimum length is ${control.errors['minlength'].requiredLength} characters.`;
            } else if (control.errors?.['maxlength']) {
                return `Maximum length is ${control.errors['maxlength'].requiredLength} characters.`;
            } else if (control.errors?.['pattern']) {
                return 'Invalid format.';
            }
        }
        return input.errorMessage ?? '';
    }

    private getValidators(item: InputItem) {
        const validators = [];
        if (item.required) validators.push(Validators.required);
        if (item.minLength) validators.push(Validators.minLength(item.minLength));
        if (item.maxLength) validators.push(Validators.maxLength(item.maxLength));
        // Add pattern or other validators if needed
        return validators;
    }

    onBlur(name: string) {
        const control = this.formControls[name];
        if (control) {
            control.markAsTouched();
        }
    }

    onChange(name: string) {
        const control = this.formControls[name];
        if (control) {
            control.updateValueAndValidity();
        }
    }

    isError(input: InputItem): boolean {
        const control = this.formControls[input.name];
        return control ? control.invalid && (control.dirty || control.touched) : false;
    }
}
