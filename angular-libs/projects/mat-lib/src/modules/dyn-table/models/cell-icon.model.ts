import { InsightColorTypes, InsightIconTypes } from '@core/shared/modules/lyn-insight-icon/models';
import { ITableHeaderControlModel, TABLE_CELL_TYPES } from '.';

export interface ICellIconModel extends ITableHeaderControlModel {
  cellType?: TABLE_CELL_TYPES;
  cellParam: ((param: any) => CellIconConfigModel) | CellIconConfigModel | any;
}

export interface CellIconConfigModel {
  class?: string;
  color?: InsightColorTypes;
  icon?: InsightIconTypes;
  text?: string;
}
