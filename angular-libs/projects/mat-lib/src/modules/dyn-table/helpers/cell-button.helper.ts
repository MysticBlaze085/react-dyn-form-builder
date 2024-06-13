import { ButtonConfigModel, ICellButtonModel } from '../models/cell-button.model';
import { InsightColorEnums, InsightIconEnums } from '@core/shared/modules/lyn-insight-icon/models';
import { TABLE_CELL_ENUMS, TABLE_CELL_TYPES } from '../models';

import { TableHeaderDefault } from './table-header-default.helper';

export class CellButton extends TableHeaderDefault {
  cellType: TABLE_CELL_TYPES = TABLE_CELL_ENUMS.BUTTON;
  icon?: ButtonConfigModel;
  cellParam: any | ((param: any) => any);
  buttonText?: string;
  hiddenCellButton: (param: any) => any;

  constructor(controls: ICellButtonModel) {
    super(controls);
    this.icon = controls.icon;
    this.buttonText = controls.buttonText;
    this.cellType = controls.cellType || TABLE_CELL_ENUMS.BUTTON;
    this.cellParam = controls.cellParam || {
      class: '',
      color: InsightColorEnums.DEFAULT,
      icon: InsightIconEnums.EDIT,
      text: 'Button Example',
    };
    this.hiddenCellButton = controls.hiddenCellButton || ((param: any) => param);
  }
}
