import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface RadioItem {
    id: string;
    name: string;
    description: string;
}

@Component({
    standalone: true,
    selector: 'tw-radio',
    template: `
        @if (isArray(radio)) {
        <fieldset aria-label="Plan">
            <div class="space-y-5">
                @for (r of radio; track $index) {
                <div class="relative flex items-start">
                    <div class="flex h-6 items-center">
                        <input
                            [id]="r.id"
                            [attr.aria-describedby]="r.id + '-description'"
                            name="plan"
                            type="radio"
                            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div class="ml-3 text-sm leading-6">
                        <label [for]="r.id" class="font-medium text-gray-900">{{ r.name }}</label>
                        <p [id]="r.id + '-description'" class="text-gray-500">{{ r.description }}</p>
                    </div>
                </div>
                }
            </div>
        </fieldset>
        } @else {
        <div class="relative flex items-start">
            <div class="flex h-6 items-center">
                <input
                    [id]="radio.id"
                    [attr.aria-describedby]="radio.id + '-description'"
                    [name]="radio.name"
                    type="radio"
                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
            </div>
            <div class="ml-3 text-sm leading-6">
                <label [for]="radio.id" class="font-medium text-gray-900">{{ radio.name }}</label>
                <p [id]="radio.id + '-description'" class="text-gray-500">{{ radio.description }}</p>
            </div>
        </div>
        }
    `,
    styles: [],
})
export class TwRadioComponent implements OnChanges {
    @Input() radio: RadioItem | RadioItem[] = [];

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

    isArray(radio: RadioItem | RadioItem[]): radio is RadioItem[] {
        return Array.isArray(radio);
    }
}
