import { Directive, computed, signal } from '@angular/core';

export interface SortableItem {
    id: string;
    [key: string]: any;
}

@Directive({
    selector: '[adk-sorting]',
    exportAs: 'adkSorting',
    standalone: true,
})
export class AdkSorting<T extends SortableItem> {
    #items = signal<T[]>([]);
    #sortKey = signal<string | null>(null);
    #sortDirection = signal<'asc' | 'desc'>('asc');

    sortedItems = computed(() => {
        const items = [...this.#items()];
        const key = this.#sortKey();
        const direction = this.#sortDirection();

        if (!key) return items;

        return items.sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];

            if (aValue < bValue) {
                return direction === 'asc' ? -1 : 1;
            } else if (aValue > bValue) {
                return direction === 'asc' ? 1 : -1;
            } else {
                return 0;
            }
        });
    });

    /**
     * Add items to the list
     * @param newItems
     */
    add(...newItems: T[]): void {
        this.#items.update((items) => [...items, ...newItems]);
    }

    /**
     * Set the sorting key and direction
     * @param key
     * @param direction
     */
    sort(key: string, direction: 'asc' | 'desc'): void {
        this.#sortKey.set(key);
        this.#sortDirection.set(direction);
    }

    /**
     * Clear the sorting
     */
    clearSort(): void {
        this.#sortKey.set(null);
        this.#sortDirection.set('asc');
    }

    /**
     * Get the current sorting key
     */
    getSortKey(): string | null {
        return this.#sortKey();
    }

    /**
     * Get the current sorting direction
     */
    getSortDirection(): 'asc' | 'desc' {
        return this.#sortDirection();
    }
}
