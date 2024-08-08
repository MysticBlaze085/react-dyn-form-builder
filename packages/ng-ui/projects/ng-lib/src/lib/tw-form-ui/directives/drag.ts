import { Directive, EventEmitter, HostBinding, HostListener, Output, signal } from '@angular/core';

@Directive({
    selector: '[adkDraggable]',
    standalone: true,
})
export class AdkDraggableDirective {
    #isDragging = signal(false);

    @Output() dragStart = new EventEmitter<DragEvent>();
    @Output() dragEnd = new EventEmitter<DragEvent>();

    @HostBinding('draggable') draggable = true;

    @HostBinding('class.dragging')
    get isDragging() {
        return this.#isDragging();
    }

    @HostListener('dragstart', ['$event'])
    onDragStart(event: DragEvent) {
        this.#isDragging.set(true);
        this.dragStart.emit(event);
    }

    @HostListener('dragend', ['$event'])
    onDragEnd(event: DragEvent) {
        this.#isDragging.set(false);
        this.dragEnd.emit(event);
    }
}
