import { Directive, computed, signal } from '@angular/core';

import { ID } from '../models';

@Directive({
    selector: '[adk-selection]',
    exportAs: 'adkSelection',
    standalone: true,
})
export class AdkSelection {
    #items = signal<Record<ID, boolean>>({});
    count = computed(() => Object.values(this.#items()).filter(Boolean).length);

    items = computed(() => Object.keys(this.#items()).filter((id) => this.#items()[id]));
    /**
     * Select multiple items
     * @param ids
     */
    select(...ids: ID[]): void {
        this.#items.update((items) => ids.reduce((accumulator, id) => ({ ...accumulator, [id]: true }), items));
    }

    /**
     * Deselect an item
     * @param id
     */
    deselect(id: ID): void {
        this.#items.update((items) => {
            const { [id]: _, ...rest } = items;
            return rest;
        });
    }

    findObj(val: string): any | undefined {
        let foundObj;
        this.#items.update((items) => {
            foundObj = items[val];
            return items;
        });
        return foundObj;
    }

    /**
     * Clear all selected items
     */
    clear(): void {
        this.#items.set({});
    }

    /**
     * Check if an item is selected
     * @param id
     */
    selected(id: ID): boolean {
        return this.#items()[id] ?? false;
    }

    /**
     * Check if object is selected
     */
    selectedObj(obj: any): boolean {
        const objStr = JSON.stringify(obj);
        return this.#items()[objStr] ?? false;
    }
}
