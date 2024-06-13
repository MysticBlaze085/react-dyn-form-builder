import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { FieldComponent } from '../field/field.component';
import { RadioFieldControlModel } from './api';

@Component({
  selector: 'lyn-radio-field',
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioFieldComponent extends FieldComponent implements OnChanges, OnDestroy {
  @Input() public fieldControl!: RadioFieldControlModel;

  constructor() {
    super();
  }
  public ngOnChanges({ fieldControl, formValue }: SimpleChanges): void {
    super.ngOnChanges({ fieldControl, formValue });
  }
  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
