import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'lead' | 'paragraph' | 'small';
type Color =
    | 'inherit'
    | 'current'
    | 'black'
    | 'white'
    | 'blue-gray'
    | 'gray'
    | 'brown'
    | 'deep-orange'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'light-green'
    | 'green'
    | 'teal'
    | 'cyan'
    | 'light-blue'
    | 'blue'
    | 'indigo'
    | 'deep-purple'
    | 'purple'
    | 'pink'
    | 'red';

@Component({
    selector: 'tw-typography',
    standalone: true,
    imports: [CommonModule],
    template: `
        <p [ngClass]="[variantClass, colorClass, classStyle, 'block', 'antialiased', 'font-sans']" style="white-space: nowrap;">
            <ng-content></ng-content>
        </p>
    `,
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
})
export class TwTypographyComponent implements OnChanges {
    @Input() variant: Variant = 'paragraph';
    @Input() color: Color = 'blue-gray';
    @Input() classStyle = '';

    get variantClass(): string {
        switch (this.variant) {
            case 'h1':
                return 'text-4xl';
            case 'h2':
                return 'text-3xl';
            case 'h3':
                return 'text-2xl';
            case 'h4':
                return 'text-xl';
            case 'h5':
                return 'text-lg';
            case 'h6':
                return 'text-base';
            case 'lead':
                return 'text-lg leading-relaxed';
            case 'paragraph':
                return 'text-base';
            case 'small':
                return 'text-sm';
            default:
                return 'text-base';
        }
    }

    get colorClass(): string {
        return `text-${this.color}`;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['variant']) this.variant = changes['variant'].currentValue;
    }
}
