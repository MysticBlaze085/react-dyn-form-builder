export enum INPUT_ENUMS {
  AUTOCOMPLETE = 'AUTOCOMPLETE',
  CHECKBOX = 'CHECKBOX',
  COPY_LINK = 'COPY_LINK',
  CUSTOM_FILE = 'CUSTOM_FILE',
  DATE_DEFAULT = 'DATE_DEFAULT',
  DEFAULT = 'DEFAULT',
  DROPDOWN_DEFAULT = 'DROPDOWN_DEFAULT',
  DROPDOWN_MULTI = 'DROPDOWN_MULTI',
  DROPDOWN_OPTION_GROUP = 'DROPDOWN_OPTION_GROUP',
  FILE = 'FILE',
  INSIGHT_TEXT = 'INSIGHT_TEXT',
  INT = 'INT',
  PASSWORD = 'PASSWORD',
  RADIO_GROUP = 'RADIO_GROUP',
  SELECTION_LIST = 'SELECTION_LIST',
  SLIDER = 'SLIDER',
  TEXT = 'TEXT',
  TEXTAREA = 'TEXTAREA',
}

export type INPUT_TYPES =
  | INPUT_ENUMS.AUTOCOMPLETE
  | INPUT_ENUMS.CHECKBOX
  | INPUT_ENUMS.COPY_LINK
  | INPUT_ENUMS.CUSTOM_FILE
  | INPUT_ENUMS.DATE_DEFAULT
  | INPUT_ENUMS.DEFAULT
  | INPUT_ENUMS.DROPDOWN_DEFAULT
  | INPUT_ENUMS.DROPDOWN_MULTI
  | INPUT_ENUMS.DROPDOWN_OPTION_GROUP
  | INPUT_ENUMS.FILE
  | INPUT_ENUMS.INSIGHT_TEXT
  | INPUT_ENUMS.INT
  | INPUT_ENUMS.PASSWORD
  | INPUT_ENUMS.RADIO_GROUP
  | INPUT_ENUMS.SELECTION_LIST
  | INPUT_ENUMS.SLIDER
  | INPUT_ENUMS.TEXT
  | INPUT_ENUMS.TEXTAREA;

export enum DATE_INPUT_ENUMS {
  DEFAULT = 'DEFAULT',
  BASIC_RANGE = 'BASIC_RANGE',
  CUSTOM_SELECTION_STRATEGY = 'CUSTOM_SELECTION_STRATEGY',
}

export type DATE_FIELD_TYPES = DATE_INPUT_ENUMS.DEFAULT | DATE_INPUT_ENUMS.BASIC_RANGE | DATE_INPUT_ENUMS.CUSTOM_SELECTION_STRATEGY;

export enum INPUT_APPEARANCE_ENUMS {
  DEFAULT = 'legacy',
  OUTLINE = 'outline',
  STANDARD = 'standard',
  FILL = 'fill',
}

export type INPUT_APPEARANCE_TYPES =
  | INPUT_APPEARANCE_ENUMS.DEFAULT
  | INPUT_APPEARANCE_ENUMS.FILL
  | INPUT_APPEARANCE_ENUMS.OUTLINE
  | INPUT_APPEARANCE_ENUMS.STANDARD;

export enum INPUT_UPDATE_ON_ENUMS {
  CHANGE = 'change',
  BLUR = 'blur',
  SUBMIT = 'submit',
}
