import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CheckboxComponent } from './types/checkbox.component';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './types/email.component';
import { Field } from '../models';
import { InputComponent } from './types/input.component';
import { MultiSelectComponent } from './types/multi-select.component';
import { PasswordComponent } from './types/password.component';
import { RadioComponent } from './types/radio.component';
import { SelectComponent } from './types/select.component';
import { TextareaComponent } from './types/textarea.component';

const components = [
    InputComponent,
    CheckboxComponent,
    RadioComponent,
    TextareaComponent,
    PasswordComponent,
    SelectComponent,
    MultiSelectComponent,
    EmailComponent,
];

@Component({
    standalone: true,
    selector: 'adk-field',
    imports: [CommonModule, components],
    template: `
        @if(field) { @switch(field.type) { @case('checkbox') {
        <adk-checkbox [field]="field"></adk-checkbox>
        } @case('radio') {
        <adk-radio [field]="field"></adk-radio>
        } @case('textarea') {
        <adk-textarea [field]="field"></adk-textarea>
        } @case('password') {
        <adk-password-input [field]="field"></adk-password-input>
        } @case('email') {
        <adk-email-input [field]="field"></adk-email-input>
        }@case('select') {
        <adk-multi-select [field]="field"></adk-multi-select>
        } @default {
        <adk-input [field]="field"></adk-input>
        } } }
    `,
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
})
export class FieldComponent implements OnChanges {
    @Input() field!: Field;

    get props() {
        return this.field?.props;
    }

    get steps() {
        return this.props?.['steps'] ?? [];
    }

    ngOnChanges({ field }: SimpleChanges): void {
        if (field) this.field = field.currentValue;
    }
}
