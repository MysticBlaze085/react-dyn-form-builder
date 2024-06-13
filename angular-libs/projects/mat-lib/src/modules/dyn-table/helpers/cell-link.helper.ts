import { ICellLinkModel, TABLE_CELL_ENUMS, TABLE_CELL_TYPES } from '../models';

import { ButtonConfigModel } from '../models/cell-button.model';
import { TableHeaderDefault } from './table-header-default.helper';

export class CellLink extends TableHeaderDefault {
  cellType: TABLE_CELL_TYPES = TABLE_CELL_ENUMS.LINK;
  cellParam: (param: any) => any;
  icon?: ButtonConfigModel;

  constructor(controls: ICellLinkModel) {
    super(controls);
    this.cellType = controls.cellType ?? TABLE_CELL_ENUMS.LINK;
    this.cellParam = controls.cellParam ?? ((param: any) => param);
    this.icon = controls.icon;
  }
}
