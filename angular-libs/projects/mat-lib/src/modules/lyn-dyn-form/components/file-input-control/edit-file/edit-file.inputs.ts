import { FileInputControl, TextInputControl, TextareaInputControl } from '@core/shared/modules/lyn-dyn-form/helpers';

import { IControlBaseModel } from '@core/shared/modules/lyn-dyn-form/models';
import { Validators } from '@angular/forms';

export const FileControls: (param: boolean, fileParam: boolean, fileButtonText: string) => IControlBaseModel[] = (
  disabled: boolean = false,
  disableFile: boolean = false,
  fileButtonText: string = 'Add Certificate'
) => {
  const fileValidator = disableFile ? [] : [Validators.required];
  return [
    new TextInputControl({
      controlName: 'data',
      label: 'Data',
      placeholder: 'Data',
      required: !disableFile,
      hidden: true,
      validators: [...fileValidator],
      value: null,
      disabled,
    }),
    new TextInputControl({
      controlName: 'id',
      label: 'ID',
      placeholder: 'ID',
      required: false,
      hidden: true,
      validators: [],
      value: null,
      disabled,
    }),
    new TextInputControl({
      controlName: 'name',
      hint: 'Certificate name reference',
      label: 'Name',
      placeholder: 'Name',
      required: true,
      hidden: false,
      validators: [Validators.required],
      errorMessage: 'Name is required',
      value: null,
      disabled,
    }),
    new TextareaInputControl({
      controlName: 'description',
      hint: 'Brief certificate description',
      label: 'Description',
      placeholder: 'Description',
      required: false,
      hidden: false,
      validators: [],
      disabled,
    }),
    new FileInputControl({
      controlName: 'file',
      hint: 'Certificate file name',
      label: 'Certificate',
      placeholder: 'Certificate',
      required: !disableFile,
      validators: [...fileValidator],
      multiple: true,
      buttonText: fileButtonText,
      disabled,
    }),
  ];
};
