import { BehaviorSubject, Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
    selector: 'adk-button',
    standalone: true,
    imports: [CommonModule, NgClass],
    template: `
        <!-- Button Variants -->
        <!-- <button
            class="py-2 px-4 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full {{
                disabled ? (disabledStyle$ | async) : (color$ | async)
            }}"
            type="{{ type }}"
            [disabled]="disabled"
        >
            <ng-content></ng-content>
        </button> -->
        <button
            [ngClass]="customClasses"
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
                width: 100%;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit, OnChanges {
    @Input() disabled!: boolean;
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

    filledClass = '{color} {textColor} {hoverEffect}';
    gradientClass = 'bg-gradient-to-r from-{color}-500 to-{color}-600 {textColor} hover:from-{color}-600 hover:to-{color}-700';
    outlinedClass = 'border border-{color}-500 text-{color}-500 hover:bg-{color}-500 hover:text-white';
    textClass = `text-{color}-500 hover:text-{color}-600`;

    primaryColor = 'bg-blue-500';
    secondaryColor = 'bg-gray-700';
    successColor = 'bg-green-500';
    warnColor = 'bg-amber-500';
    dangerColor = 'bg-red-500';
    disabledColor = 'bg-gray-500';

    disabledClass = 'rounded-lg px-4 py-2 {color} {textColor} {disabledEffect}';

    ngOnInit(): void {
        this.updateBtnStyle();
    }

    ngOnChanges({ disabled, variant, color, customClasses, bgColor, textColor, hoverEffect, disabledEffect }: SimpleChanges) {
        if (variant || color || customClasses || bgColor || textColor || hoverEffect || disabledEffect || disabled) {
            this.updateBtnStyle();
        }
    }

    updateBtnStyle() {
        let color = this.primaryColor;
        switch (this.color) {
            case 'success':
                color = this.successColor;
                break;
            case 'warn':
                color = this.warnColor;
                break;
            case 'secondary': {
                color = this.secondaryColor;
                break;
            }
            case 'danger':
                color = this.dangerColor;
                break;
            default:
                color = this.primaryColor;
                break;
        }
        let style = '';
        switch (this.variant) {
            case 'filled':
                style = this.filledClass;
                break;
            case 'gradient':
                style = this.gradientClass;
                break;
            case 'outlined':
                style = this.outlinedClass;
                break;
            case 'text':
                style = this.textClass;
                break;
            default:
                style = this.filledClass;
                break;
        }
        this.btnStyle.next(
            style
                .replace(/{color}/g, color)
                .replace(/{textColor}/g, this.textColor)
                .replace(/{hoverEffect}/g, this.hoverEffect) +
                ' ' +
                this.customClasses
        );
        this.disabledStyle.next(
            this.disabledClass
                .replace(/{disabledEffect}/g, this.disabledEffect)
                .replace(/{color}/g, this.disabledColor)
                .replace(/{textColor}/g, this.textColor)
        );
    }
}
