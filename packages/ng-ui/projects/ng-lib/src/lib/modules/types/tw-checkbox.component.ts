import { Component, Input } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { BaseComponent, FieldItem } from './base.component';

@Component({
    standalone: true,
    selector: 'tw-checkbox',
    imports: [CommonModule, FormsModule],
    template: `
        @if (isArray(checkbox)) {
        <fieldset>
            <legend class="sr-only">Notifications</legend>
            <div class="space-y-5">
                @for (cb of checkbox; track $index) {
                <div class="relative flex items-start">
                    <div class="flex h-6 items-center">
                        <input
                            [id]="getId(cb)"
                            [attr.describedby]="getId(cb) + '-description'"
                            [name]="getName(cb)"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div class="ml-3 text-sm leading-6">
                        <label [for]="getId(cb)" class="font-medium text-gray-900">{{ getName(cb) }}</label>
                        <p [id]="getId(cb) + '-description'" class="text-gray-500">{{ getDescription(cb) }}</p>
                    </div>
                </div>
                }
            </div>
        </fieldset>
        } @else {
        <div class="relative flex items-start">
            <div class="flex h-6 items-center">
                <input
                    [id]="getId(checkbox)"
                    [attr.describedby]="getId(checkbox) + '-description'"
                    [name]="getName(checkbox)"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
            </div>
            <div class="ml-3 text-sm leading-6">
                <label [for]="getId(checkbox)" class="font-medium text-gray-900">{{ getName(checkbox) }}</label>
                <p [id]="getId(checkbox) + '-description'" class="text-gray-500">{{ getDescription(checkbox) }}</p>
            </div>
        </div>
        }
    `,
})
export class TwCheckboxComponent extends BaseComponent {
    @Input() checkbox: FieldItem | FieldItem[] = [];
    override formControls: { [key: string]: FormControl } = {};

    ngOnInit(): void {
        if (this.isArray(this.checkbox)) {
            for (const item of this.checkbox) {
                this.formControls[item.name] = new FormControl(item.value ?? '', this.getValidators(item));
            }
        } else {
            const item = this.checkbox;
            this.formControls[item.name] = new FormControl(item.value ?? '', this.getValidators(item));
        }
    }

    isArray(checkbox: FieldItem | FieldItem[]): checkbox is FieldItem[] {
        return Array.isArray(checkbox);
    }
}
