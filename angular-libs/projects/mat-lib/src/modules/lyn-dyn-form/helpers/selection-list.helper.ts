import { INPUT_ENUMS, INPUT_TYPES, ISelectionListModel } from '../models';
import { InsightColorEnums, InsightColorTypes, InsightIconEnums, InsightIconTypes } from '@core/shared/modules/lyn-insight-icon/models';

import { ControlBase } from './control-base.helper';

export class SelectionListInputControl extends ControlBase {
  controlType: INPUT_TYPES = INPUT_ENUMS.SELECTION_LIST;

  addControlName?: string;
  addControlType: INPUT_TYPES = INPUT_ENUMS.TEXT;
  addInputLabel?: string;
  addInputValidation?: any[];
  addInputButton?: { color: InsightColorTypes; icon: InsightIconTypes; text: string };
  removeInputButton?: { color: InsightColorTypes; icon: InsightIconTypes; text: string };
  addValue?: string;
  value?: { [key: string]: string }[];

  constructor(options: ISelectionListModel) {
    super(options);
    this.controlType = options.controlType ?? this.controlType;
    this.addControlName = options.addControlName;
    this.addControlType = options.addControlType ?? this.addControlType;
    this.addInputLabel = options.addInputLabel ?? 'Add Item';
    this.addInputButton = options.addInputButton ?? { color: InsightColorEnums.SUCCESS, icon: InsightIconEnums.ADD, text: 'Add Item' };
    this.removeInputButton = options.removeInputButton ?? {
      color: InsightColorEnums.ERROR,
      icon: InsightIconEnums.REMOVE,
      text: 'Remove Item',
    };
    this.addValue = options.addValue ?? '';
    this.value = options.value ?? [];
  }
}
