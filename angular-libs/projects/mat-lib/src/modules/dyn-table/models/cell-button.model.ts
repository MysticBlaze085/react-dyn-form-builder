import { ITableHeaderControlModel, TABLE_CELL_TYPES } from '.';
import { InsightColorTypes, InsightIconTypes } from '@core/shared/modules/lyn-insight-icon/models';

export interface ICellButtonModel extends ITableHeaderControlModel {
  icon?: ButtonConfigModel;
  buttonText?: string;
  cellType?: TABLE_CELL_TYPES;
  cellParam: ((param: ButtonConfigModel) => any) | any;
  hiddenCellButton: (param: any) => any;
}

export interface ButtonConfigModel {
  class?: string;
  color?: InsightColorTypes;
  icon?: InsightIconTypes;
  text?: string;
}
