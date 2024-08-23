/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';

import { AdkFieldList } from '../../directives';
import { AdkFormGroup } from '../../directives/form-group';
import { CommonModule } from '@angular/common';
import { Field } from '../models';
import { FieldComponent } from './field.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'adk-fields',
    imports: [CommonModule, ReactiveFormsModule, FieldComponent],
    hostDirectives: [AdkFieldList, AdkFormGroup],
    template: `
        <div [class]="wrapperClass">
            @for (field of fields.fields(); track (field.id)) {
            <adk-field [field]="field"> </adk-field>
            }
        </div>
    `,
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `,
    ],
})
export class FieldsComponent implements OnChanges {
    fields = inject(AdkFieldList, { self: true });

    @Input() fieldConfig: Field[] = [];
    @Input() wrapperClass = 'w-full';

    ngOnChanges({ fieldConfig }: SimpleChanges): void {
        if (fieldConfig) {
            this.fields.clear();
            this.fields.add(...fieldConfig.currentValue);
        }
    }
}
