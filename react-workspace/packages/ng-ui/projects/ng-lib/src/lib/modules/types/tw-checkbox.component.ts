import { Component, Input, ViewEncapsulation } from '@angular/core';

export interface CheckboxItem {
    id: string;
    name: string;
    description: string;
}

@Component({
    standalone: true,
    selector: 'tw-checkbox',
    template: `
        @if (isArray(checkbox)) {
        <fieldset>
            <legend class="sr-only">Notifications</legend>
            <div class="space-y-5">
                @for (cb of checkbox; track $index) {
                <div class="relative flex items-start">
                    <div class="flex h-6 items-center">
                        <input
                            [id]="getCheckboxId(cb)"
                            [attr.describedby]="getCheckboxId(cb) + '-description'"
                            [name]="getCheckboxName(cb)"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div class="ml-3 text-sm leading-6">
                        <label [for]="getCheckboxId(cb)" class="font-medium text-gray-900">{{ getCheckboxName(cb) }}</label>
                        <p [id]="getCheckboxId(cb) + '-description'" class="text-gray-500">{{ getCheckboxDescription(cb) }}</p>
                    </div>
                </div>
                }
            </div>
        </fieldset>
        } @else {
        <div class="relative flex items-start">
            <div class="flex h-6 items-center">
                <input
                    [id]="getCheckboxId(checkbox)"
                    [attr.describedby]="getCheckboxId(checkbox) + '-description'"
                    [name]="getCheckboxName(checkbox)"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
            </div>
            <div class="ml-3 text-sm leading-6">
                <label [for]="getCheckboxId(checkbox)" class="font-medium text-gray-900">{{ getCheckboxName(checkbox) }}</label>
                <p [id]="getCheckboxId(checkbox) + '-description'" class="text-gray-500">{{ getCheckboxDescription(checkbox) }}</p>
            </div>
        </div>
        }
    `,
    styles: [],
})
export class TwCheckboxComponent {
    @Input() checkbox: CheckboxItem | CheckboxItem[] = [];

    isArray(checkbox: CheckboxItem | CheckboxItem[]): checkbox is CheckboxItem[] {
        return Array.isArray(checkbox);
    }

    getCheckboxId(checkbox: CheckboxItem): string {
        return checkbox.id;
    }

    getCheckboxName(checkbox: CheckboxItem): string {
        return checkbox.name;
    }

    getCheckboxDescription(checkbox: CheckboxItem): string {
        return checkbox.description;
    }
}
