import { Identifiable, TYPE, VALUE } from "./identifiable";

export declare type AttributeEvent = (field: Field, event?: any) => void;

export declare type FieldSteps = Identifiable & {
  [additionalProperties: string]: any;
} & {
  step: number;
  label: string;
  active: boolean;
};

export declare type FieldOptions = Identifiable & {
  [additionalProperties: string]: any;
} & {
  value: string;
  label: string;
  checked?: boolean;
  description?: string;
  category?: string;
};

export type Field<
  Props = FieldProps & {
    [additionalProperties: string]: any;
  }
> = Identifiable & {
  type: TYPE;
  key: string;
  value: VALUE;
  description?: string;
  errorMessage?: string;
  hint?: string;
  label?: string;
  placeholder?: string;
  showError?: boolean;
  validation?: any | null;
  disabled?: boolean;
  props?: Props;
  formControl?: any | { [key: string]: any };
};

export type FieldProps = {
  autocomplete?: string;
  appearance?: string;
  class?: string;
  errorMessage?: string;
  labelClass?: string;
  inputClass?: string;
  options?: FieldOptions[];
  rows?: number;
  cols?: number;
  max?: number;
  min?: number;
  minLength?: number;
  isMultipleTag?: boolean;
  pattern?: string | RegExp;
  required?: boolean;
  tabindex?: number;
  attributes?: {
    [key: string]: string | number;
  };
  step?: number;
  focus?: AttributeEvent;
  blur?: AttributeEvent;
  keyup?: AttributeEvent;
  keydown?: AttributeEvent;
  click?: AttributeEvent;
  change?: AttributeEvent;
  keypress?: AttributeEvent;
};

export class FieldBuilder {
  private static idCounter = 0;

  private static generateId(): string {
    return `field_${this.idCounter++}`;
  }

  static createField(
    type: TYPE,
    key: string,
    value: any,
    label?: string,
    placeholder?: string,
    props?: FieldProps,
    description?: string,
    validation?: any[]
  ): Field {
    const id = this.generateId();
    const field: Field = {
      id,
      type,
      key,
      value,
      validation: validation || [],
      label: label || "",
      placeholder: placeholder || "",
      description: description || "",
      props: props || {},
    };
    const addedValidations = validation || [];
    field.validation = props?.required
      ? [...addedValidations]
      : field.validation;
    field.formControl =
      field.type === "checkbox" ? this.checkboxFormFields(field) : {};
    //FIXME: update to react formcontrol
    return field;
  }

  // static validators = {
  //   required: (required: boolean) => (required ? Validators.required : []),
  //   email: (email: boolean) => (email ? Validators.email : []),
  //   pattern: (pattern: string | RegExp) =>
  //     pattern ? Validators.pattern(pattern) : [],
  // };

  static createOptionsField(
    type: TYPE,
    key: string,
    label: string,
    placeholder: string,
    options: FieldOptions[],
    props?: FieldProps,
    description?: string
  ): Field {
    const id = this.generateId();
    const field: Field = {
      id,
      type,
      key,
      value: "", // No initial value for options field
      label,
      placeholder,
      description: description || "",
      props: {
        options,
        ...props,
      },
    };
    const addedValidations = field.validation || [];
    field.validation = props?.required
      ? [...addedValidations]
      : field.validation;
    field.formControl =
      field.type === "checkbox" ? this.checkboxFormFields(field) : {};
    return field;
  }

  static checkboxFormFields(field: Field): { [key: string]: any } {
    const formControls: { [key: string]: any } = {};
    field.props?.options?.forEach((option) => {
      formControls[option.id] = {};
    });
    return formControls;
  }
}
