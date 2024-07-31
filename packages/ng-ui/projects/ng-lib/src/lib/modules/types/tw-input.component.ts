import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { BaseComponent, FieldItem } from './base.component';

@Component({
    selector: 'tw-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="relative flex items-start">
            <div class="flex h-6 items-center">
                <input
                    [id]="getId(input)"
                    [name]="getName(input)"
                    [placeholder]="getPlaceholder(input)"
                    [formControl]="formControls[getName(input)]"
                    (blur)="onBlur(getName(input))"
                    (change)="onChange(getName(input))"
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
        <p class="mt-2 text-sm text-red-600" [id]="getId(input) + '-error'" *ngIf="isError(input)">
            {{ getErrorMessage(input) }}
        </p>
    `,
})
export class TwInputComponent extends BaseComponent implements OnInit {
    constructor() {
        super();
    }
    @Input() input: FieldItem = {
        id: 'default',
        name: 'default',
        placeholder: 'Default Example',
        hint: 'This is a default hint',
        value: '',
        ariaInvalid: true,
        errorMessage: 'This field is required.',
    };

    override formControls: { [key: string]: FormControl } = {};

    ngOnInit(): void {
        const item = this.input;
        this.formControls[item.name] = new FormControl(item.value ?? '', this.getValidators(item));
    }
}
