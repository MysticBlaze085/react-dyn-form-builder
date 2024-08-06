import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { BaseComponent, FieldItem } from './base.component';

@Component({
    standalone: true,
    selector: 'tw-checkbox',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        @if (checkbox) { @if (isArray(checkbox)) {
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
        } } @else {
        <div class="inline-flex items-center">
            <label
                class="relative flex items-center cursor-pointer p-3 rounded-full"
                for=":r7o:"
                style="position: relative; overflow: hidden;"
                ><input
                    type="checkbox"
                    class="peer relative appearance-none border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-gray-900 checked:border-gray-900 checked:before:bg-gray-900 w-4 h-4"
                    id=":r7o:"
                    [checked]="checked" /><span
                    class="text-white absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                    ><svg
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
                        ></path></svg></span
            ></label>
        </div>
        }
    `,
})
export class TwCheckboxComponent extends BaseComponent {
    @Input() checkbox: FieldItem | FieldItem[] | undefined = undefined;
    @Input() checked = false;

    override formControls: { [key: string]: FormControl } = {};

    ngOnInit(): void {
        if (this.checkbox) {
            if (this.isArray(this.checkbox)) {
                for (const item of this.checkbox) {
                    this.formControls[item.name] = new FormControl(item.value ?? '', this.getValidators(item));
                }
            } else {
                const item = this.checkbox;
                this.formControls[item.name] = new FormControl(item.value ?? '', this.getValidators(item));
            }
        }
    }

    isArray(checkbox: FieldItem | FieldItem[]): checkbox is FieldItem[] {
        return Array.isArray(checkbox);
    }
}
