import { DateTimePickerComponent } from './date-time-picker.component';
import { FormBuilder } from '@angular/forms';
import { SimpleChange } from '@angular/core';
import moment from 'moment';

describe('DateTimePickerComponent', () => {
  let component: DateTimePickerComponent;

  beforeEach(() => {
    component = new DateTimePickerComponent(new FormBuilder());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges()', () => {
    it('should call ngOnChanges', () => {
      spyOn(component.valueChanges, 'emit');
      const dates = { startDate: moment().startOf('day'), endDate: moment().endOf('day') };
      const simpleChange = {
        dateData: new SimpleChange(
          undefined,
          {
            startDate: dates.startDate,
            endDate: dates.endDate,
          },
          true
        ),
      };

      component.ngOnChanges(simpleChange);
      expect(component.formGroup.value).toEqual({
        startDate: dates.startDate,
        endDate: dates.endDate,
      });
      expect(component.timeFormGroup.value).toEqual({
        endTime: moment(dates.endDate).format('hh:mm:ss'),
        endMidday: moment(dates.endDate).format('A'),
        startTime: moment(dates.startDate).format('hh:mm:ss'),
        startMidday: moment(dates.startDate).format('A'),
      });

      component.dateRangeChange();
      expect(component.startDate).toEqual(dates.startDate);
      expect(component.endDate).toEqual(dates.endDate);

      component.valueChange('start', { value: '' } as any);
      component.valueChange('end', { value: '' } as any);

      component.emitValueChanges();
      expect(component.valueChanges.emit).toHaveBeenCalled();
    });
  });
});
