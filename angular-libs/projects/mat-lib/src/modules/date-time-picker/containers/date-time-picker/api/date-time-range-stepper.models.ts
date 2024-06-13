import { FormControl } from '@angular/forms';
import { Moment } from 'moment';

export interface DateTimeRangeModel {
  startDate: Moment;
  startTime: string;
  endDate: Moment;
  endTime: string;
}

export interface DateTimeModel {
  startDate: Moment;
  endDate: Moment;
}

export interface StartDateTimeRangeControlModel {
  startDate: FormControl;
  startTime: FormControl;
}

export interface EndDateTimeRangeControlModel {
  endDate: FormControl;
  endTime: FormControl;
}

export enum DateTimeRangeEnums {
  Date = 'Date',
  Time = 'Time',
}

export type DateTimeRangeType = DateTimeRangeEnums.Date | DateTimeRangeEnums.Time;

/**
 * An enum for all possible durations the user can select from
 */
export enum DateTimeDurationEnums {
  Hour = 'hour',
  Day = 'day',
  Month = 'month',
  Week = 'week',
}

export type DateTimeDurationTypes =
  | DateTimeDurationEnums.Day
  | DateTimeDurationEnums.Hour
  | DateTimeDurationEnums.Month
  | DateTimeDurationEnums.Week;
