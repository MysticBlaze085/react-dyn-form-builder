import type { Meta, StoryObj } from '@storybook/angular';

import { AdkDraggableDirective } from '../drag';
import { AdkDroppableDirective } from '../drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-drag-drop-example',
    template: `
        <div class="drag-item" adkDraggable (dragStart)="onDragStart($event)" (dragEnd)="onDragEnd($event)">Drag me!</div>
        <div class="drop-zone" adkDroppable (drop)="onDrop($event)">
            {{ droppedItem ? 'Dropped: ' + droppedItem : 'Drop here' }}
        </div>
    `,
    styles: [
        `
            .drag-item {
                width: 100px;
                height: 100px;
                background-color: #f0f0f0;
                border: 1px solid #ccc;
                text-align: center;
                line-height: 100px;
            }
            .drop-zone {
                width: 200px;
                height: 200px;
                background-color: #f9f9f9;
                border: 2px dashed #ccc;
                margin-top: 20px;
                text-align: center;
                line-height: 200px;
            }
        `,
    ],
    standalone: true,
    imports: [CommonModule, AdkDraggableDirective, AdkDroppableDirective],
})
export class DragDropExampleComponent {
    droppedItem: string | null = null;

    onDragStart(event: DragEvent) {
        console.log('Drag started:', event);
    }

    onDragEnd(event: DragEvent) {
        console.log('Drag ended:', event);
    }

    onDrop(event: DragEvent) {
        this.droppedItem = 'Item dropped';
        console.log('Dropped:', event);
    }
}

const meta: Meta<typeof DragDropExampleComponent> = {
    component: DragDropExampleComponent,
    title: '(TW) Angular UI / Directives / Draggable Table',
};

export default meta;
type Story = StoryObj<typeof DragDropExampleComponent>;

export const Primary: Story = {
    args: {},
};
