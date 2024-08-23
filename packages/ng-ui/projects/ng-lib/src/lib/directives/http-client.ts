import { Directive, inject, input } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Directive({
  selector: '[adk-http-client]',
  exportAs: 'adkHttpClient',
  standalone: true,
})
export class AdkHttpClient {
  #http = inject(HttpClient);
  /**
   * The URL to send the request to
   */
  url = input.required<string>({ alias: 'adkUrl' });
  /**
   * The page to get data from
   */
  page = input(1, { alias: 'adkPage' });
  /**
   * The number of items to get
   */
  limit = input(10, { alias: 'adkLimit' });
  /**
   * Get data from the server
   * @param page
   */
  async get<T>(page = { page: 1, limit: 10 }): Promise<{ total: number; items: T[] }> {
    const searchParams = new URLSearchParams({
      _page: page.page.toString(),
      _per_page: page.limit.toString(),
    }).toString();

    const response = await firstValueFrom(
      this.#http.get<T[]>(`${this.url()}?${searchParams}`, {
        observe: 'response',
      })
    );
    const total = parseInt(response.headers.get('X-Total-Count') ?? '0', 10);
    const items = response.body!;

    return { total, items };
  }
}
