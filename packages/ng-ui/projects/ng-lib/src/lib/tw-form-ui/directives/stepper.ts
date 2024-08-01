import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[adkStepper]',
  exportAs: 'adkStepper',
})
export class AdkStepperDirective {
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  @HostListener('click', ['$event.target']) onClick(target: HTMLElement): void {
    const action = target.getAttribute('data-action');
    if (action === 'next') {
      this.next();
    } else if (action === 'previous') {
      this.previous();
    }
  }

  next(): void {
    this.nextStep.emit();
  }

  previous(): void {
    this.previousStep.emit();
  }
}
