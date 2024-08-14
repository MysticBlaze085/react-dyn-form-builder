import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[adkTooltip]',
    standalone: true,
})
export class AdkTooltipDirective {
    @Input('adkTooltip') tooltipText: string = '';
    @Input() tooltipPlacement: string = 'top';

    private tooltipElement!: HTMLElement;
    private isOverflowing: boolean = false;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('mouseenter') onMouseEnter() {
        this.isOverflowing = this.checkOverflow(this.el.nativeElement);
        if (!this.tooltipElement && this.isOverflowing) {
            this.showTooltip();
        }
    }

    @HostListener('mouseleave') onMouseLeave() {
        if (this.tooltipElement) {
            this.hideTooltip();
        }
    }

    private showTooltip() {
        this.tooltipElement = this.renderer.createElement('div');
        this.renderer.appendChild(document.body, this.tooltipElement);
        this.applyStyles();
        this.renderer.setProperty(this.tooltipElement, 'textContent', this.tooltipText);
        this.updateTooltipPosition();
    }

    private applyStyles() {
        this.renderer.addClass(this.tooltipElement, 'tooltip');
        this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
        this.renderer.setStyle(this.tooltipElement, 'z-index', '1050');
        this.renderer.setStyle(this.tooltipElement, 'background-color', '#000');
        this.renderer.setStyle(this.tooltipElement, 'color', '#fff');
        this.renderer.setStyle(this.tooltipElement, 'padding', '0.375rem 0.75rem');
        this.renderer.setStyle(this.tooltipElement, 'border-radius', '0.375rem');
        this.renderer.setStyle(this.tooltipElement, 'font-size', '0.875rem');
        this.renderer.setStyle(this.tooltipElement, 'max-width', '400px');
        this.renderer.setStyle(this.tooltipElement, 'box-shadow', '0 2px 4px rgba(0,0,0,0.2)');
    }

    private updateTooltipPosition() {
        const hostPos = this.el.nativeElement.getBoundingClientRect();
        const tooltipPos = this.tooltipElement.getBoundingClientRect();
        let top, left;

        switch (this.tooltipPlacement) {
            case 'top':
                top = hostPos.top - tooltipPos.height - 10;
                left = hostPos.left + hostPos.width / 2 - tooltipPos.width / 2;
                break;
            case 'bottom':
                top = hostPos.bottom + 10;
                left = hostPos.left + hostPos.width / 2 - tooltipPos.width / 2;
                break;
            case 'left':
                top = hostPos.top + hostPos.height / 2 - tooltipPos.height / 2;
                left = hostPos.left - tooltipPos.width - 10;
                break;
            case 'right':
                top = hostPos.top + hostPos.height / 2 - tooltipPos.height / 2;
                left = hostPos.right + 10;
                break;
        }

        this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
    }

    private hideTooltip() {
        this.renderer.removeChild(document.body, this.tooltipElement);
        this.tooltipElement = null as any;
    }

    private checkOverflow(element: HTMLElement): boolean {
        return element.scrollWidth > element.clientWidth;
    }
}
