import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DateTimeModel, DateTimePickerValidationHelper } from './api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import moment, { Moment } from 'moment';

import { MatSelectChange } from '@angular/material/select';

const customValidator = new DateTimePickerValidationHelper();
@Component({
  selector: 'lyn-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
})
export class DateTimePickerComponent implements OnChanges {
  @Input() public dateData!: DateTimeModel;
  @Input() public disabled: boolean = false;
  @Output() public valueChanges: EventEmitter<DateTimeModel> = new EventEmitter<DateTimeModel>();

  @HostListener('window:click', ['$event.target'])
  onClick(targetElement: string | any) {
    const isMatCalendar = targetElement?.matches ? targetElement.matches('.mat-calendar-body-cell-content') : false;
    if (isMatCalendar) {
      this.resetFormGroups();
    }
  }
  /** Date range form groups */
  public startDate: Moment = moment().startOf('day');
  public endDate: Moment = moment().endOf('day');
  public formGroup: FormGroup<{ startDate: FormControl; endDate: FormControl }> = this.fb.group({
    startDate: [moment().startOf('day')],
    endDate: [moment().endOf('day')],
  });
  /** Clock form group */
  public timeFormGroup: FormGroup<{ startTime: FormControl; endTime: FormControl; startMidday: FormControl; endMidday: FormControl }> =
    this.fb.group({
      startTime: ['12:00:00', [Validators.required, customValidator.dateValidator(), customValidator.dateTimeBadeCharValidator()]],
      endTime: ['11:59:59', [Validators.required, customValidator.dateValidator(), customValidator.dateTimeBadeCharValidator()]],
      startMidday: ['AM', Validators.required],
      endMidday: ['PM', Validators.required],
    });

  public isValid: boolean = true;
  public displayTime: string = this.setTimeDisplayValues();

  constructor(private readonly fb: FormBuilder) {}

  public ngOnChanges({ dateData }: SimpleChanges) {
    if (dateData?.currentValue && dateData.firstChange) {
      this.dateData = dateData.currentValue;
      this.initialize(dateData.currentValue);
    }
    this.formGroup.valueChanges.subscribe((result) => {
      if (this.timeFormGroup.get('startTime')?.valid && this.timeFormGroup.get('endTime')?.valid)
        this.displayTime = this.setTimeDisplayValues();
      const isAfter = moment(result['endDate']).isAfter(result['startDate']);
      if (!isAfter) {
        this.isValid = false;
        this.timeFormGroup
          ?.get('endTime')
          ?.setErrors({ customInvalidMessage: { message: 'End time range must be set after not before start time' } });
      } else {
        this.isValid = true;
        this.timeFormGroup?.get('endTime')?.setErrors(null);
      }
    });
  }
  /**
   * Sets input values to controller variables
   * @param dateValues
   */
  private initialize(dateValues: DateTimeModel) {
    this.formGroup.patchValue(dateValues);
    const startTime = moment(dateValues.startDate).format('hh:mm:ss');
    const startTimeMidday = moment(dateValues.startDate).format('A');
    this.timeFormGroup.get('startTime')?.patchValue(startTime);
    this.timeFormGroup.get('startMidday')?.patchValue(startTimeMidday);

    const endTime = moment(dateValues.endDate).format('hh:mm:ss');
    const endTimeMidday = moment(dateValues.endDate).format('A');
    this.timeFormGroup.get('endTime')?.patchValue(endTime);
    this.timeFormGroup.get('endMidday')?.patchValue(endTimeMidday);
  }
  /**
   * Reset FormGroup and TimeFormGroup values to initial values
   */
  private resetFormGroups() {
    this.timeFormGroup.get('startTime')?.patchValue('12:00:00');
    this.timeFormGroup.get('startMidday')?.patchValue('AM');
    this.timeFormGroup.get('endTime')?.patchValue('11:59:59');
    this.timeFormGroup.get('endMidday')?.patchValue('PM');
  }
  /**
   * Set time display values
   */
  private setTimeDisplayValues(): string {
    return `(
      ${this.timeFormGroup.get('startTime')?.value} ${this.timeFormGroup.get('startMidday')?.value} - ${
      this.timeFormGroup.get('endTime')?.value
    } ${this.timeFormGroup.get('endMidday')?.value})`;
  }
  /**
   * Sets date range values
   */
  public dateRangeChange() {
    this.startDate = this.formGroup.get('startDate')?.value?.startOf('day');
    this.endDate = this.formGroup.get('endDate')?.value?.endOf('day');
  }
  /**
   * Value changes
   */
  public valueChange(type: 'start' | 'end', event: MatSelectChange) {
    switch (type) {
      case 'start': {
        if (event.value) this.timeFormGroup.get('startMidday')?.patchValue(event.value);
        else if (typeof event === 'string') this.timeFormGroup.get('startTime')?.patchValue(event);
        this.patchStartDate();
        break;
      }
      case 'end': {
        if (event.value) this.timeFormGroup.get('endMidday')?.patchValue(event.value);
        else if (typeof event === 'string') this.timeFormGroup.get('endTime')?.patchValue(event);
        this.patchEndDate();
        break;
      }
    }
  }
  /**
   * Patch start time to start date form group value
   */
  private patchStartDate() {
    const timeValueToSet = `${this.timeFormGroup.value['startTime']} ${this.timeFormGroup.value['startMidday']}`;
    const formatDate = moment(timeValueToSet, 'hh:mm:ss A').format('HH:mm:ss').split(':');
    const updatedStartDate = {
      startDate: moment(this.startDate).set({
        hour: parseInt(formatDate[0], 10),
        minute: parseInt(formatDate[1], 10),
        second: parseInt(formatDate[2], 10),
      }),
    };
    this.formGroup.get('startDate')?.patchValue(updatedStartDate.startDate);
    this.startDate = updatedStartDate.startDate;
  }
  /**
   * Patch end time to end date form group value
   */
  private patchEndDate() {
    const timeValueToSet = `${this.timeFormGroup.value['endTime']} ${this.timeFormGroup.value['endMidday']}`;
    const formatDate = moment(timeValueToSet, 'hh:mm:ss A').format('HH:mm:ss').split(':');
    const updatedStartDate = {
      endDate: moment(this.endDate).set({
        hour: parseInt(formatDate[0], 10),
        minute: parseInt(formatDate[1], 10),
        second: parseInt(formatDate[2], 10),
      }),
    };
    this.formGroup.get('endDate')?.patchValue(updatedStartDate.endDate);
    this.endDate = updatedStartDate.endDate;
  }
  /**
   * Patches startTime and endTime onto startDate and endDate
   * values which emit to parent component
   */
  public emitValueChanges() {
    this.valueChanges.emit({ startDate: this.formGroup.get('startDate')?.value, endDate: this.formGroup.get('endDate')?.value });
  }
}
