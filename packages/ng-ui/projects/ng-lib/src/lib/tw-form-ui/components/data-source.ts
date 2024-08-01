import { AdkList, AdkPagination, AdkSelection } from '../directives';
import { Directive, computed, inject } from '@angular/core';
import { ID, Identifiable } from '../models';
import { Observable, map } from 'rxjs';

@Directive({
  selector: '[adk-datasource]',
  exportAs: 'adkDatasource',
  standalone: true,
  /**
   * Important! Angular Directive composition API in action!
   */
  hostDirectives: [
    // { directive: AdkHttpClient, inputs: ['adkUrl', 'adkPage', 'adkLimit'] },
    AdkList,
    AdkSelection,
    AdkPagination,
  ],
})
export class AdkDatasource<T extends Identifiable> {
  // #httpClient = inject(AdkHttpClient, { self: true });
  #list = inject<AdkList<T>>(AdkList, { self: true });
  #selection = inject(AdkSelection, { self: true });
  #pagination = inject(AdkPagination, { self: true });

  /**
   * The list of datasource items
   */
  readonly items = this.#list.items;

  /**
   * Check if we are on the first page
   */
  readonly first = this.#pagination.first;

  /**
   * Check if we are on the last page
   */
  readonly last = this.#pagination.last;

  /**
   * The selected items of the selected datasource
   */
  readonly selectedItems = computed(() => this.items().filter((item) => this.#selection.selected(item.id)));

  async fetch(data: Observable<any[]>): Promise<void> {
    data
      .pipe(
        map((items) => {
          return items.map((item, i) => {
            return {
              ...item,
              id: item.id ?? i,
            };
          });
        })
      )
      .subscribe({
        next: (value: any[]) => this.#list.add(...value),
        complete: () => console.info('Fetched data successfully!'),
      });
  }

  /**
   * Select datasource by their ids
   * @param ids
   */
  select(...ids: ID[]): void {
    this.#selection.select(...ids);
  }

  /**
   * Select all datasource
   */
  selectAll(): void {
    this.#selection.select(...this.items().map((todo) => todo.id));
  }

  /**
   * Deselect all datasource
   */
  reset(): void {
    this.#selection.clear();
  }

  /**
   * Check if a todo is selected
   * @param id
   */
  selected(id: ID): boolean {
    return this.#selection.selected(id);
  }

  /**
   * Deselect a todo by its id
   * @param id
   */
  deselect(id: ID): void {
    this.#selection.deselect(id);
  }
}
