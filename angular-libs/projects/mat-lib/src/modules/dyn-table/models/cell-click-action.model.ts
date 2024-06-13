import { ITableHeaderControlModel, TABLE_CELL_TYPES } from './table.model';

export interface ICellClickActionModel extends ITableHeaderControlModel {
  cellType?: TABLE_CELL_TYPES;
  cellParam: (param: any) => any;
}
