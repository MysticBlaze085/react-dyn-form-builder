import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';

import { NavigationStoreService } from '@core/services';

@Component({
  selector: 'lyn-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnChanges {
  @Input() public breadcrumb: boolean = false;
  @Input() public borderColor!: string;
  @Input() public title!: string;

  public cardTitle$: Observable<string> = of('');

  constructor(private readonly navigationStoreService: NavigationStoreService) {}

  public ngOnChanges({ title }: SimpleChanges) {
    if (title?.currentValue) {
      this.cardTitle$ = of(title.currentValue);
    } else {
      this.cardTitle$ = this.navigationStoreService.pageTitle$;
    }
  }
}
