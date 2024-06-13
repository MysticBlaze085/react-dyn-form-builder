/* eslint-disable @typescript-eslint/ban-types */

import { ITableHeaderControlModel, TABLE_CELL_ENUMS, TABLE_CELL_TYPES, TABLE_EXPANDABLE_TYPES } from '../models/table.model';

import { ButtonConfigModel } from '../models/cell-button.model';
import { CellIconConfigModel } from '../models/cell-icon.model';
import { Component } from '@angular/core';

export class TableBase {
  buttonConfig?: ButtonConfigModel;
  cellType?: TABLE_CELL_TYPES;
  cellName?: string;
  class?: string;
  component?: Component;
  description?: string;
  displayGroupByFilter?: boolean;
  headerName: string;
  headerIcon?: string;
  headerHidden?: boolean;
  iconConfig?: CellIconConfigModel;
  isExpandable?: boolean;
  isFooter?: boolean;
  isColumnFilter?: boolean;
  descType?: TABLE_EXPANDABLE_TYPES;
  hidden?: boolean;
  sticky?: boolean;
  stickyEnd?: boolean;
  styleTh?: any;
  styleTd?: any;
  style?: any;
  sortOrder?: number | null;
  width?: string;
  dataCy?: string;
  setHeaderName?: (param: any) => any;
  setFooterName?: (param: any) => any;
  cellParamValue?: (param: any) => any;
  cellParamCalc?: (param: any) => any;

  constructor(controls: ITableHeaderControlModel) {
    this.cellType = controls.cellType ?? TABLE_CELL_ENUMS.DEFAULT;
    this.cellName = controls.cellName ?? '';
    this.class = controls.class ?? '';
    this.component = controls.component;
    this.descType = controls.descType;
    this.description = controls.description;
    this.displayGroupByFilter = controls.displayGroupByFilter;
    this.headerName = controls.headerName ?? '';
    this.headerIcon = controls.headerIcon;
    this.headerHidden = controls.headerHidden ?? false;
    this.hidden = controls.hidden ?? false;
    this.isExpandable = controls.isExpandable ?? false;
    this.isFooter = controls.isFooter ?? false;
    this.isColumnFilter = controls.isColumnFilter ?? false;
    this.sticky = controls.sticky ?? false;
    this.stickyEnd = controls.stickyEnd ?? false;
    this.styleTh = controls.styleTh;
    this.styleTd = controls.styleTd;
    this.style = controls.style;
    this.sortOrder = controls.sortOrder ?? null;
    this.width = controls.width ?? '';
    this.dataCy = controls.dataCy ?? '';
    this.setHeaderName = controls.setHeaderName;
    this.setFooterName = controls.setFooterName;
    this.cellParamValue = controls.cellParamValue;
    this.cellParamCalc = controls.cellParamCalc;
  }
}
