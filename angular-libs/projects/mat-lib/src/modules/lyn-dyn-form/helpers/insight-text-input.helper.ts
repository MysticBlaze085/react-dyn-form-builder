import { ICON_EVENT_ENUM, IInsightTextInputModel, INPUT_ENUMS, INPUT_TYPES, TextInsightIconModel } from '../models';
import { InsightColorEnums, InsightIconEnums } from '@core/shared/modules/lyn-insight-icon/models';

import { ControlBase } from './control-base.helper';

export class InsightTextInputControl extends ControlBase {
  controlType: INPUT_TYPES = INPUT_ENUMS.INSIGHT_TEXT;
  value?: string;
  icon: TextInsightIconModel;

  constructor(options: IInsightTextInputModel) {
    super(options);
    this.controlType = options.controlType || this.controlType;
    this.value = options.value || '';
    this.icon = options.icon || {
      class: '',
      color: InsightColorEnums.INFO,
      icon: InsightIconEnums.INFO,
      text: 'Icon Example Text',
      eventType: ICON_EVENT_ENUM.CANCEL,
    };
  }
}
