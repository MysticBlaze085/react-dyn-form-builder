import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { GatewaysInputControls, GatewaysMultiInputControls } from './gateways-selector.inputs';
import { Observable, tap } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { FormGroupBuilderHelper } from '@core/shared/modules/lyn-dyn-form/helpers';
import { GatewayValueType } from './gateways-selector.models';
import { IControlBaseModel } from '@core/shared/modules/lyn-dyn-form/models';
import { Store } from '@ngrx/store';
import { selectGatewayList } from '@core/entity-store/profile/profile-effects';

@Component({
  selector: 'lyn-gateways-selector',
  templateUrl: './gateways-selector.component.html',
})
export class GatewaysSelectorComponent implements OnChanges {
  @Input() public isMulti: boolean = true;
  @Input() public gatewayValue!: GatewayValueType;
  @Output() public valueChanges: EventEmitter<{ gateways: GatewayValueType }> = new EventEmitter<{
    gateways: GatewayValueType;
  }>();

  public form: UntypedFormGroup = this.fb.group({
    gateways: [],
  });
  public gatewayList$?: Observable<{ id: string | undefined; name: string | undefined }[] | undefined>;
  public inputControls: IControlBaseModel = GatewaysMultiInputControls([]);

  constructor(private readonly fb: UntypedFormBuilder, private readonly store: Store) {}

  public ngOnChanges({ isMulti, gatewayValue }: SimpleChanges): void {
    if (isMulti) {
      this.initialize(isMulti.currentValue);
      if (gatewayValue?.currentValue) {
        this.gatewayValue = gatewayValue.currentValue;
        this.form.get('gateways')?.patchValue(this.gatewayValue);
      }
    }
  }
  /**
   * Initialize gateway list values
   * Sets input controls on condition of isMulti
   * Sets form group and patches value
   */
  public initialize(isMulti: boolean) {
    this.gatewayList$ = this.store.select(selectGatewayList).pipe(
      tap((gateways: { id: string | undefined; name: string | undefined }[] | undefined) => {
        if (gateways) {
          this.inputControls = isMulti ? GatewaysMultiInputControls(gateways) : GatewaysInputControls(gateways);
          this.form = new FormGroupBuilderHelper([this.inputControls]).formGroup;

          if (gateways.length) {
            const patchValue = isMulti ? ['all'] : gateways[0].id ?? null;
            if (patchValue || patchValue === null) {
              this.onValueChanges({ gateways: patchValue });
            }
          }
        }
      })
    );
  }

  public onValueChanges(event: { gateways: GatewayValueType }) {
    this.form.patchValue(event);
    this.valueChanges.emit(event);
  }
}
