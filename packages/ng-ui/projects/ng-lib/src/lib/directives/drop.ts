import { Directive, EventEmitter, HostBinding, HostListener, Output, signal } from '@angular/core';

@Directive({
    selector: '[adkDroppable]',
    standalone: true,
})
export class AdkDroppableDirective {
    #isOver = signal(false);

    @Output() drop = new EventEmitter<DragEvent>();

    @HostBinding('class.over')
    get isOver() {
        return this.#isOver();
    }

    @HostListener('dragover', ['$event'])
    onDragOver(event: DragEvent) {
        event.preventDefault();
        this.#isOver.set(true);
    }

    @HostListener('dragleave', ['$event'])
    onDragLeave(_event: DragEvent) {
        this.#isOver.set(false);
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        event.preventDefault();
        this.#isOver.set(false);
        this.drop.emit(event);
    }
}
