export type ID = string | number;

export type TYPE =
    | 'checkbox'
    | 'email'
    | 'custom-display'
    | 'file'
    | 'text'
    | 'insight-text'
    | 'int'
    | 'custom-select'
    | 'password'
    | 'radio'
    | 'slider'
    | 'stepper'
    | 'select'
    | 'textarea';

export type TABLE_TYPE = 'default-table';

export type VALUE = string | string[] | boolean | null;

export type Identifiable = {
    id: ID;
};
