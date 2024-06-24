import { Directive, inject } from '@angular/core';

import { AdkFieldList } from './field-list';
import { Field } from '../models';

@Directive({
  selector: '[adk-fields]',
  exportAs: 'adkFields',
  standalone: true,
  hostDirectives: [AdkFieldList],
})
export class AdkFields<T extends Field> {
  #fields: AdkFieldList<T> = inject<AdkFieldList<T>>(AdkFieldList, { self: true });

  /**
   * The list of fields
   */
  readonly items = this.#fields.fields;

  /**
   * Set fields
   */
  async setFields(fields: T[]): Promise<void> {
    this.#fields.add(...fields);
  }
}
