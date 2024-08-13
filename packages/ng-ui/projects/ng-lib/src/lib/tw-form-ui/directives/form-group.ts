import { AbstractControl, FormGroup } from '@angular/forms';
import { Directive, WritableSignal, signal } from '@angular/core';
import { Field, FieldOptions } from '../models';

@Directive({
    selector: '[adk-form-group]',
    exportAs: 'adkFormGroup',
    standalone: true,
})
export class AdkFormGroup<T extends Field> {
    #formGroup = signal<FormGroup<any>>(new FormGroup({}));

    /**
     * The form group
     */
    formGroup: WritableSignal<FormGroup<any>> = this.#formGroup;

    /**
     * Set the form group
     */
    setFormGroup(fields: T[]): void {
        const formControls = fields.reduce((accumulator: any, field) => {
            if (field.formControl instanceof AbstractControl) {
                accumulator[field.key] = field.formControl;
            } else if (field.formControl instanceof Object) {
                // object of form controls
                field.props?.options?.forEach((option: FieldOptions) => {
                    const key = option.id;
                    accumulator[key] = (field.formControl as { [key: string]: AbstractControl<any, any> })[key];
                });
            }
            return accumulator;
        }, {});

        const formGroup = new FormGroup(formControls);
        this.#formGroup.set(formGroup);
    }

    /**
     * Reset the form group
     */
    reset(): void {
        this.#formGroup.set(new FormGroup({}));
    }
}
