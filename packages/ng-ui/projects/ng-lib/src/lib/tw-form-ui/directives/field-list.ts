import { Directive, computed, signal } from '@angular/core';
import { Field, ID } from '../models';

@Directive({
  selector: '[adz-field-builder]',
  exportAs: 'adkFieldList',
  standalone: true,
})
export class AdkFieldList<T extends Field> {
  #fields = signal<Record<ID, T>>({});

  readonly fields = computed(() => Object.values(this.#fields()));

  /**
   * Get a field by id
   * @param id
   */
  get(id: ID): T | undefined {
    return this.#fields()[id];
  }

  /**
   * Add new fields to the list
   * @param newItems
   */
  add(...newFields: T[]): void {
    this.#fields.update((fields) => newFields.reduce((accumulator, field) => ({ ...accumulator, [field.id]: field }), fields));
  }

  /**
   * Update an field in the list
   * @param field
   */
  update(field: T): void {
    this.#fields.update((fields) => ({ ...fields, [field.id]: field }));
  }

  /**
   * Remove an field from the list
   * @param field
   */
  remove(field: T): void {
    this.#fields.update((fields) => {
      const { [field.id]: _, ...rest } = fields;
      return rest;
    });
  }

  /**
   * Clear all fields from the list
   */
  clear(): void {
    this.#fields.set({});
  }
}
