import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';

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

  constructor() {}

  public ngOnChanges({ title }: SimpleChanges) {
    this.cardTitle$ = of(title.currentValue);
  }
}
