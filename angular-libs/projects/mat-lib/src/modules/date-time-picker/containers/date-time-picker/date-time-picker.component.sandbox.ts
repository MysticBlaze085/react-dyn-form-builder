import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DataTimePickerModule } from '../../data-time-picker.module';
import moment from 'moment';
import { sandboxOf } from 'angular-playground';

@Component({
  selector: 'lyn-sandbox',
  template: ` <div style="display: flex; flex-direction: column; justify-content: start; align-items:center; height: 100vh; gap: 0.5rem;">
    <ng-content [select]="'.selector'"></ng-content>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxTimePickerComponent {}

export default sandboxOf(SandboxTimePickerComponent, {
  label: 'DateTimePickerComponent Sandbox',
  imports: [CommonModule, BrowserAnimationsModule, ReactiveFormsModule, DataTimePickerModule],
}).add('Date Time Picker Control', {
  template: `<lyn-sandbox>
    <ng-container class="selector">
      <lyn-date-time-picker [dateData]="data" (valueChanges)="value.get('data')?.patchValue($event)"></lyn-date-time-picker>
    </ng-container>
  </lyn-sandbox>`,
  context: {
    value: new FormBuilder().group({ data: [null] }),
    method: (param: any) => console.info('Param', param),
    data: { startDate: moment().startOf('day'), endDate: moment().endOf('day') },
  },
});
