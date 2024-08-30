import { BehaviorSubject, Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
    selector: 'adk-button',
    standalone: true,
    imports: [CommonModule, NgClass],
    template: `
        <button
            [ngClass]="getButtonClasses()"
            class="select-none rounded-lg bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full {{
                disabled ? (disabledStyle$ | async) : (color$ | async)
            }}"
            [disabled]="disabled"
            type="button"
        >
            <ng-content></ng-content>
        </button>
    `,
    styles: [
        `
            :host {
                display: block;
                width: auto;
            }
            button:disabled {
                cursor: not-allowed;
                opacity: 0.5;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit, OnChanges {
    @Input() disabled = false;
    @Input() variant: 'filled' | 'gradient' | 'outlined' | 'text' = 'filled';
    @Input() color: 'primary' | 'secondary' | 'success' | 'warn' | 'danger' = 'primary';
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
    @Input() customClasses = '';
    @Input() bgColor = 'bg-blue-500';
    @Input() textColor = 'text-white';
    @Input() hoverEffect = 'hover:shadow-lg';
    @Input() disabledEffect = 'opacity-50 cursor-not-allowed opacity-50 disabled:cursor-not-allowed disabled:opacity-50';

    btnStyle = new BehaviorSubject<string>('');
    disabledStyle = new BehaviorSubject<string>('');

    get color$(): Observable<string> {
        return this.btnStyle.asObservable();
    }

    get disabledStyle$(): Observable<string> {
        return this.disabledStyle.asObservable();
    }

    private readonly colorClasses = {
        primary: 'bg-blue-500',
        secondary: 'bg-gray-700',
        success: 'bg-green-500',
        warn: 'bg-amber-500',
        danger: 'bg-red-500',
    };

    private readonly variantClasses = {
        filled: 'text-white shadow-md shadow-gray-900/10',
        gradient: 'bg-gradient-to-r from-{color}-500 to-{color}-600 text-white',
        outlined: 'border border-{color}-500 text-{color}-500 hover:bg-{color}-500 hover:text-white',
        text: 'text-{color}-500 hover:text-{color}-600',
    };

    ngOnInit(): void {
        this.getButtonClasses();
    }

    ngOnChanges({ disabled, variant, color, customClasses, bgColor, textColor, hoverEffect, disabledEffect }: SimpleChanges) {
        if (variant || color || customClasses || bgColor || textColor || hoverEffect || disabledEffect || disabled) {
            this.disabled = disabled ? disabled.currentValue : false;
            this.getButtonClasses();
        }
    }

    getButtonClasses(): string {
        const baseClasses =
            'select-none rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase transition-all w-full';
        const variantClass = this.variantClasses[this.variant] || this.variantClasses['filled'];
        const colorClass = this.colorClasses[this.color] || this.colorClasses['primary'];
        const hoverClass = this.disabled ? '' : this.hoverEffect;
        const disabledClass = this.disabled ? this.disabledEffect : '';

        return `${baseClasses} ${colorClass} ${variantClass} ${hoverClass} ${disabledClass} ${this.customClasses}`;
    }
}
