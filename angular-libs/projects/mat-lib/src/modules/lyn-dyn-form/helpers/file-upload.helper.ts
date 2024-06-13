import { INPUT_ENUMS, INPUT_TYPES } from '../models';

import { ControlBase } from './control-base.helper';
import { FileUploadModel } from '../models/file-upload.model';

export class FileInputControl extends ControlBase {
  controlType: INPUT_TYPES = INPUT_ENUMS.FILE;
  value?: string;
  buttonText?: string;

  constructor(options: FileUploadModel) {
    super(options);
    this.controlType = options.controlType ?? this.controlType;
    this.value = options.value ?? '';
    this.buttonText = options.buttonText ?? 'Add File';
  }
}
