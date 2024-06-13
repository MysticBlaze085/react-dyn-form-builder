import { CellIconConfigModel, ICellIconModel } from '../models/cell-icon.model';
import { InsightColorEnums, InsightIconEnums } from '@core/shared/modules/lyn-insight-icon/models';
import { TABLE_CELL_ENUMS, TABLE_CELL_TYPES } from '../models';

import { TableBase } from './table-base.helper';

export class CellIcon extends TableBase {
  cellType: TABLE_CELL_TYPES = TABLE_CELL_ENUMS.ICON;
  cellParam: CellIconConfigModel | ((param: any) => CellIconConfigModel);

  constructor(controls: ICellIconModel) {
    super(controls);
    this.cellType = controls.cellType || TABLE_CELL_ENUMS.ICON;
    this.cellParam = controls.cellParam || {
      class: '',
      color: InsightColorEnums.INFO,
      icon: InsightIconEnums.INFO,
      text: 'Icon Example Text',
    };
  }
}
