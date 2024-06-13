import { ICellClickActionModel, TABLE_CELL_ENUMS, TABLE_CELL_TYPES } from '../models';

import { TableHeaderDefault } from './table-header-default.helper';

export class CellClickAction extends TableHeaderDefault {
  cellType: TABLE_CELL_TYPES = TABLE_CELL_ENUMS.CLICK_ACTION;
  cellParam: (param: any) => any;

  constructor(controls: ICellClickActionModel) {
    super(controls);
    this.cellType = controls.cellType ?? TABLE_CELL_ENUMS.CLICK_ACTION;
    this.cellParam = controls.cellParam ?? ((param: any) => param);
  }
}
