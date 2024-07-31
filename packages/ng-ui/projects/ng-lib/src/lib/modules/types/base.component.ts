import { FormControl, ValidatorFn, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

export interface FieldItem {
    description?: string;
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
    selector: 'tw-base',
    template: ``,
})
export class BaseComponent {
    formControls: { [key: string]: FormControl } = {};

    getId(item: FieldItem): string {
        return item.id;
    }

    getName(item: FieldItem): string {
        return item.name;
    }

    getPlaceholder(item: FieldItem): string {
        return item.placeholder ?? new TitleCasePipe().transform(item.name);
    }

    getValue(item: FieldItem): string {
        return item.value ?? '';
    }

    getAriaInvalid(item: FieldItem): boolean {
        const control = this.formControls[item.name];
        return control && control.invalid && (control.dirty || control.touched);
    }

    getErrorMessage(item: FieldItem): string {
        const control = this.formControls[item.id];
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
        return item.errorMessage ?? '';
    }

    public getValidators(item: FieldItem) {
        const validators: ValidatorFn[] = [];
        if (item.required) validators.push(Validators.required);
        if (item.minLength) validators.push(Validators.minLength(item.minLength));
        if (item.maxLength) validators.push(Validators.maxLength(item.maxLength));
        // Add pattern or other validators if needed
        return validators;
    }

    getDescription(item: FieldItem): string {
        return item?.description ?? '';
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

    isError(item: FieldItem): boolean {
        const control = this.formControls[item.name];
        return control ? control.invalid && (control.dirty || control.touched) : false;
    }
}
