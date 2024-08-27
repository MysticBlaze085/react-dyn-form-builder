import { Directive, Input, computed, signal } from '@angular/core';

import { PreferenceCriteria } from '../models';

@Directive({
    selector: '[adk-table-preferences]',
    exportAs: 'adkTablePreferences',
    standalone: true,
})
export class AdkTablePreferences {
    @Input() set preferences(value: PreferenceCriteria) {
        this.setPreferences(value);
    }

    #state = signal<PreferenceCriteria>({ visibleColumns: [], groupByColumn: '' });
    readonly state = computed(() => this.#state());
    readonly visibleColumns = computed(() => this.getVisibleColumns());
    readonly groupByColumn = computed(() => this.getGroupByColumn());

    setPreferences(preferences: PreferenceCriteria): void {
        this.#state.set(preferences);
    }

    setVisibleColumns(visibleColumns: string[]): void {
        this.#state.set({ ...this.#state(), visibleColumns });
    }

    getVisibleColumns(): string[] {
        const { visibleColumns } = this.#state();
        return visibleColumns;
    }

    setGroupByColumn(groupByColumn: string): void {
        this.#state.set({ ...this.#state(), groupByColumn });
    }

    getGroupByColumn(): string {
        const { groupByColumn } = this.#state();
        return groupByColumn;
    }
}
