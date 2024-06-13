import { ITableHeaderControlModel, TABLE_CELL_TYPES } from './table.model';

import { ButtonConfigModel } from './cell-button.model';

export interface ICellLinkModel extends ITableHeaderControlModel {
  cellType?: TABLE_CELL_TYPES;
  cellParam: (param: any) => any;
  icon?: ButtonConfigModel;
}
