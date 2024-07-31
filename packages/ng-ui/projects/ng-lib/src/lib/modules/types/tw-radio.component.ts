import { BaseComponent, FieldItem } from './base.component';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

export interface RadioItem {
    id: string;
    name: string;
    description: string;
}

@Component({
    standalone: true,
    selector: 'tw-radio',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <fieldset aria-label="Plan">
            <div class="space-y-5">
                @if (isArray(radio)) { @for (r of radio; track $index) {
                <div class="relative flex items-start">
                    <div class="flex h-6 items-center">
                        <input
                            [id]="getId(r)"
                            [name]="groupName"
                            [value]="getName(r)"
                            [placeholder]="getPlaceholder(r)"
                            [formControl]="formControls[getName(r)]"
                            (blur)="onBlur(r.name)"
                            (change)="onChange(r.name)"
                            type="radio"
                            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div class="ml-3 text-sm leading-6">
                        <label [for]="getId(r)" class="font-medium text-gray-900">{{ r.name }}</label>
                        <p [id]="getId(r) + '-description'" class="text-gray-500">{{ r.description }}</p>
                    </div>
                </div>
                } } @else {
                <div class="relative flex items-start">
                    <div class="flex h-6 items-center">
                        <input
                            [id]="getId(radio)"
                            [name]="groupName"
                            [value]="radio.name"
                            [placeholder]="getPlaceholder(radio)"
                            [formControl]="formControl"
                            (blur)="onBlur(radio.name)"
                            (change)="onChange(radio.name)"
                            type="radio"
                            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div class="ml-3 text-sm leading-6">
                        <label [for]="getId(radio)" class="font-medium text-gray-900">{{ radio.name }}</label>
                        <p [id]="getId(radio) + '-description'" class="text-gray-500">{{ radio.description }}</p>
                    </div>
                </div>
                }
            </div>
        </fieldset>
    `,
    styles: [],
})
export class TwRadioComponent extends BaseComponent implements OnChanges {
    @Input() radio: FieldItem | FieldItem[] = [];
    @Input() groupName = 'radioGroup';
    override formControls: { [key: string]: FormControl } = {};

    ngOnInit(): void {
        if (Array.isArray(this.radio)) {
            for (const item of this.radio) {
                this.formControls[item.name] = new FormControl(item.value ?? '', this.getValidators(item));
            }
        } else {
            const item = this.radio as FieldItem;
            this.formControls[item.name] = new FormControl(item.value ?? '', this.getValidators(item));
        }
    }

    ngOnChanges({ radio }: SimpleChanges): void {
        if (radio) {
            const isString = radio.currentValue;
            if (typeof isString === 'string') {
                try {
                    this.radio = JSON.parse(isString);
                } catch (e) {
                    console.error('Failed to parse radio input:', e, isString);
                    this.radio = [];
                }
            } else {
                this.radio = isString;
            }
        }
    }

    isArray(radio: FieldItem | FieldItem[]): radio is FieldItem[] {
        return Array.isArray(radio);
    }
}
