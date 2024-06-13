import { ITableHeaderControlModel, TABLE_CELL_ENUMS, TABLE_CELL_TYPES } from '../models/table.model';

import { ICellIconModel } from '../models/cell-icon.model';

export class TableHeaderDefault {
  cellType: TABLE_CELL_TYPES = TABLE_CELL_ENUMS.DEFAULT;
  class?: string;
  headerName: string;
  headerHidden: boolean;
  headerIcon?: string;
  iconConfig?: ICellIconModel;
  sortOrder?: number | null;
  sticky?: boolean;
  stickyEnd?: boolean;
  styleTh?: any;
  styleTd?: any;
  width?: string;
  dataCy?: string;

  constructor(controls: ITableHeaderControlModel) {
    this.cellType = controls.cellType ?? TABLE_CELL_ENUMS.DEFAULT;
    this.class = controls.class;
    this.headerName = controls.headerName ?? '';
    this.headerHidden = controls.headerHidden ?? false;
    this.headerIcon = controls.headerIcon;
    this.sortOrder = controls.sortOrder;
    this.sticky = controls.sticky ?? false;
    this.stickyEnd = controls.stickyEnd ?? false;
    this.styleTh = controls.styleTh;
    this.styleTd = controls.styleTd;
    this.width = controls.width;
    this.dataCy = controls.dataCy ?? '';
  }
}
