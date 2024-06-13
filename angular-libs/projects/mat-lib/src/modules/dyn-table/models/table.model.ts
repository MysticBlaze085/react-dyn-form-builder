/* eslint-disable @typescript-eslint/ban-types */

import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';

export enum TABLE_ENUMS {
  DEFAULT = 'DEFAULT',
}

export type TABLE_TYPES = TABLE_ENUMS.DEFAULT;

export enum TABLE_CELL_ENUMS {
  BUTTON = 'BUTTON',
  CLICK_ACTION = 'CLICK_ACTION',
  DEFAULT = 'DEFAULT',
  TRUNCATE = 'TRUNCATE',
  GROUP_FILTER = 'GROUP_FILTER',
  ICON = 'ICON',
  LINK = 'link',
  SELECT = 'select',
}

export enum TABLE_EXPANDABLE_ENUMS {
  DEFAULT = 'DEFAULT',
}

export type TABLE_EXPANDABLE_TYPES = TABLE_EXPANDABLE_ENUMS.DEFAULT;

export type TABLE_CELL_TYPES =
  | TABLE_CELL_ENUMS.BUTTON
  | TABLE_CELL_ENUMS.CLICK_ACTION
  | TABLE_CELL_ENUMS.GROUP_FILTER
  | TABLE_CELL_ENUMS.DEFAULT
  | TABLE_CELL_ENUMS.TRUNCATE
  | TABLE_CELL_ENUMS.ICON
  | TABLE_CELL_ENUMS.LINK
  | TABLE_CELL_ENUMS.SELECT;

export interface ITableHeaderControlModel {
  cellType?: TABLE_CELL_TYPES;
  cellName?: string;
  class?: string;
  component?: Component;
  descType?: TABLE_EXPANDABLE_TYPES;
  description?: string;
  displayGroupByFilter?: boolean;
  isColumnFilter?: boolean;
  headerName: string;
  headerIcon?: string;
  headerHidden?: boolean;
  hidden?: boolean;
  isExpandable?: boolean;
  isFooter?: boolean;
  sticky?: boolean;
  stickyEnd?: boolean;
  style?: string | NgStyle | any;
  styleTh?: any;
  styleTd?: any;
  sortOrder?: number | null;
  width?: string;
  dataCy?: string;
  setHeaderName?: (param: any) => any;
  setFooterName?: (param: any) => any;
  cellParamValue?: (param: any) => any | undefined;
  cellParamCalc?: (param: any) => any | undefined;
}
