import { Directive, computed, signal } from '@angular/core';
import { ID, Identifiable } from 'projects/ng-lib/src/lib/tw-form-ui/models';

import { TableState } from '../models';

@Directive({
    selector: '[adk-table]',
    exportAs: 'adkTable',
    standalone: true,
    // hostDirectives: [
    //     AdkList,
    //     AdkSelection,
    //     AdkPagination,
    // ],
})
export class AdkTable<T extends Identifiable> {
    // TODO: handle inital table data source
    // TODO: handle headers to be displayed - can automate by running through datasource list or allow
    // developer to specify
    // TODO: handle pagination
    // TODO: handle selecting rows with checkbox selected is true to display a specific row
    // TODO: handle sorting of columns
    // TODO: handle filtering of columns
    // TODO: handle dragging of columns
    // TODO: handle grouping of columns
    // TODO: handle action buttons
    // TODO: handle action column
    // TODO: handle row selection

    //TODO: figure away to handle initial values to be able to reset to initial values
    #state = signal<TableState>({
        //TODO: remove dataSource its mutable
        dataSource: [],
        draggedColIndex: null,
        filterDataSource: { column: '', value: '' },
        //TODO: remove headers its mutable
        headers: [],
        initialDataSource: [],
        initialHeaders: [],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            pageSize: 10,
        },
        preferences: {
            visibleColumns: [],
            groupBy: undefined,
        },
        selectedRows: [],
        sortDataSource: { key: '', direction: 'ascending' },
    });
    state = computed(() => this.#state());

    #dataSource = signal<Record<ID, T>>({});
    readonly dataSource = computed(() => Object.values(this.#dataSource()));

    #headers = signal<string[]>([]);
    readonly headers = computed(() => this.#headers());

    get(id: ID): T | undefined {
        return this.#dataSource()[id];
    }

    set(...newItems: T[]): void {
        this.#dataSource.update((items) =>
            newItems.reduce((accumulator, item) => {
                return { ...accumulator, [item.id]: item };
            }, items)
        );

        this.#headers.update(() => {
            const newHeaders = Object.keys(newItems[0]);
            return newHeaders;
        });

        this.#state.update((state) => ({
            ...state,
            dataSource: Object.values(this.#dataSource()),
            initialDataSource: Object.values(this.#dataSource()),
            headers: Object.keys(newItems[0]),
            initialHeaders: Object.keys(newItems[0]),
            preferences: {
                ...state.preferences,
                visibleColumns: Object.keys(newItems[0]),
            },
        }));
    }

    setHeaders(headers: string[]): void {
        this.#headers.set(headers);
        this.#state.update((state) => ({
            ...state,
            headers,
            initialHeaders: headers,
            preferences: {
                ...state.preferences,
                visibleColumns: headers,
            },
        }));
    }

    clear(): void {
        this.#dataSource.set({});
    }
}
