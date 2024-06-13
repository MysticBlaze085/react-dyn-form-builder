export enum InsightIconEnums {
  ADD = 'add_circle',
  CANCEL = 'cancel',
  CLOSE = 'close',
  DESCRIPTION = 'description',
  DELETE = 'delete',
  DONE = 'done',
  EDIT = 'mode_edit',
  ERROR = 'error',
  HELP_CENTER = 'help_center',
  INFO = 'info',
  MENU = 'more_vert',
  NOTIFICATIONS_ON = 'notifications',
  NOTIFICATIONS_OFF = 'notifications_off',
  PENDING = 'pending',
  QUESTION = 'unpublished',
  REMOVE = 'remove_circle_outline',
  SUCCESS = 'check_circle',
  UPDATING = 'arrow_circle_up',
  UNDO = 'undo',
  WARN = 'warning',
  PUBLISHED_WITH_CHANGES = 'published_with_changes',
  PRIORITY_HIGH = 'priority_high',
}

export type InsightIconTypes =
  | InsightIconEnums.ADD
  | InsightIconEnums.DESCRIPTION
  | InsightIconEnums.DELETE
  | InsightIconEnums.CLOSE
  | InsightIconEnums.CANCEL
  | InsightIconEnums.EDIT
  | InsightIconEnums.ERROR
  | InsightIconEnums.INFO
  | InsightIconEnums.PENDING
  | InsightIconEnums.PRIORITY_HIGH
  | InsightIconEnums.QUESTION
  | InsightIconEnums.REMOVE
  | InsightIconEnums.SUCCESS
  | InsightIconEnums.UPDATING
  | InsightIconEnums.UNDO
  | InsightIconEnums.WARN;

export enum InsightColorEnums {
  ERROR = 'error',
  DEFAULT = 'default',
  INFO = 'info',
  QUESTION = 'question',
  SUCCESS = 'success',
  UPDATING = 'upgrading',
  WARN = 'warn',
  PRIMARY = 'primary',
  YELLOW = 'yellow',
}

export type InsightColorTypes =
  | InsightColorEnums.DEFAULT
  | InsightColorEnums.ERROR
  | InsightColorEnums.INFO
  | InsightColorEnums.PRIMARY
  | InsightColorEnums.QUESTION
  | InsightColorEnums.SUCCESS
  | InsightColorEnums.UPDATING
  | InsightColorEnums.WARN;

export enum TextIconEnums {
  PRE = 'PRE',
  SUFFIX = 'SUFFIX',
}

export type TextIconTypes = TextIconEnums.PRE | TextIconEnums.SUFFIX;

export enum IconEventEnums {
  EDIT = 'EDIT',
  CANCEL = 'CANCEL',
  UNDEFINED = 'UNDEFINED',
  WARNING = 'WARNING',
  INFO = 'INFORMATION',
}

export type IconEventType =
  | IconEventEnums.CANCEL
  | IconEventEnums.EDIT
  | IconEventEnums.UNDEFINED
  | IconEventEnums.INFO
  | IconEventEnums.WARNING;

export interface TextInsightIconModel {
  type: TextIconTypes;
  class?: string;
  color?: InsightColorTypes;
  icon?: InsightIconTypes;
  text?: string;
  eventType?: IconEventType;
}
