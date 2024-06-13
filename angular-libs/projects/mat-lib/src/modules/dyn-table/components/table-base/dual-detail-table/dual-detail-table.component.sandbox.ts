import { CellIcon, TableBase } from '@core/shared/modules/dyn-table/helpers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ITableHeaderControlModel, TABLE_CELL_ENUMS } from '@core/shared/modules/dyn-table/models';
import { InsightColorEnums, InsightIconEnums } from '@core/shared/modules/lyn-insight-icon/models';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from '@core/shared/modules/card/card.module';
import { DualDetailTableComponent } from './dual-detail-table.component';
import { DualDetailTableOptions } from './api';
import { DynFormModule } from '@core/shared/modules/dyn-form-control/dyn-form.module';
import { Guid } from 'guid-typescript';
import { LynDynFormModule } from '@core/shared/modules/lyn-dyn-form/lyn-dyn-form.module';
import { LynInsightIconModule } from '@core/shared/modules/lyn-insight-icon/lyn-insight-icon.module';
import { LynTableComponent } from '../lyn-table/lyn-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedPipeModule } from '@core/shared/pipes';
import moment from 'moment';
import { sandboxOf } from 'angular-playground';

const alertsTableHeaderMethod = (gatewaysList: { name?: string; id?: string }[]) => {
  const columns: ITableHeaderControlModel[] = [
    { ...new TableBase({ cellType: TABLE_CELL_ENUMS.SELECT, headerName: 'select' }) },
    { ...new TableBase({ headerName: 'id', hidden: true }) },
    {
      ...new TableBase({
        cellType: TABLE_CELL_ENUMS.GROUP_FILTER,
        headerName: 'gatewayId',
        dataCy: 'table-data-cy-gatewayName',
        displayGroupByFilter: true,
        setHeaderName: () => {
          return 'gatewayName';
        },
        cellParamValue: (param) => {
          const gatewayAlert = gatewaysList.find((gateway) => gateway.id?.includes(param));
          return gatewayAlert ? gatewayAlert.name : 'Alert Gateway Name';
        },
      }),
    },
    {
      ...new TableBase({
        headerName: 'lastActivated',
        dataCy: 'table-data-cy-activated',
        cellParamValue: (param) => {
          return moment(param).format('HH:mm:ss A MM-DD-YYYY');
        },
      }),
    },
    { ...new TableBase({ headerName: 'type', dataCy: 'table-data-cy-type' }) },
    { ...new TableBase({ headerName: 'threshold', dataCy: 'table-data-cy-threshold' }) },
    {
      ...new CellIcon({
        headerName: 'muted',
        dataCy: 'table-data-cy-status',
        headerIcon: InsightIconEnums.NOTIFICATIONS_OFF,
        cellParam: (param: boolean) => {
          return setIconTypeHeader(param);
        },
      }),
    },
    {
      ...new CellIcon({
        headerName: 'active',
        dataCy: 'table-data-cy-active',
        cellParam: (param: boolean) => {
          return setActiveTypeIcon(param);
        },
      }),
    },
    {
      ...new TableBase({
        headerName: 'emailAddress',
        dataCy: 'table-data-cy-emailAddress',
      }),
    },
  ];

  const setIconTypeHeader = (muted: boolean) => {
    if (muted) {
      return {
        icon: InsightIconEnums.NOTIFICATIONS_OFF,
        color: InsightColorEnums.WARN,
        text: 'Alert Muted',
      };
    }
    return {};
  };

  const setActiveTypeIcon = (active: boolean) => {
    return active
      ? {
          icon: InsightIconEnums.SUCCESS,
          color: InsightColorEnums.SUCCESS,
          text: 'Alert Active',
        }
      : {
          icon: InsightIconEnums.WARN,
          color: InsightColorEnums.WARN,
          text: 'Alert Inactive',
        };
  };

  return columns;
};

export const AlertHistoryTableHeaders: ITableHeaderControlModel[] = [
  { ...new TableBase({ cellType: TABLE_CELL_ENUMS.SELECT, headerName: 'select' }) },
  { ...new TableBase({ headerName: 'id', hidden: true }) },
  { ...new TableBase({ headerName: 'lastUpdated' }) },
  {
    ...new CellIcon({
      headerName: 'muted',
      dataCy: 'table-data-cy-status',
      headerIcon: InsightIconEnums.NOTIFICATIONS_OFF,
      cellParam: () => {
        return {
          icon: InsightIconEnums.NOTIFICATIONS_OFF,
          color: InsightColorEnums.SUCCESS,
          text: 'Alert Muted',
        };
      },
    }),
  },
  { ...new TableBase({ headerName: 'emailAddress', isColumnFilter: true }) },
];

export default sandboxOf(DualDetailTableComponent, {
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedPipeModule,
    CardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    LynInsightIconModule,
    MatPaginatorModule,
    LynDynFormModule,
    DynFormModule,
  ],
  declarations: [LynTableComponent],
}).add('Dual Detail Table Component', {
  template: `
    <div style="margin: 0.5rem;">
      <lyn-dual-detail-table
        [data]="generateQueries()"
        [defaultPageSize]="dualTableOptions.defaultPageSize"
        [detailTableTitle]="dualTableOptions.detailTableTitle"
        [dualData]="dualData"
        [dualFilterBy]="dualTableOptions.dualFilterBy"
        [dualFindTextColumn]="dualTableOptions.dualFindTextColumn"
        [dualTableHeaders]="dualTableHeaders"
        [filterBy]="'gatewayId'"
        findTextColumn="lastUpdated"
        [isDualFilterAction]="dualTableOptions.isDualFilterAction"
        [isDualTextToFind]="dualTableOptions.isDualTextToFind"
        [isFilter]="isFilter"
        [isFilterMenu]="true"
        [isFormFilterLabel]="'gatewayName'"
        [isMainFilterAction]="dualTableOptions.isMainFilterAction"
        [isRowClickable]="isRowClickable"
        [isTextToFind]="false"
        [mainTableTitle]="dualTableOptions.mainTableTitle"
        [showPagination]="showPagination"
        [tableHeaders]="tableHeaders"
        (rowValue)="cellClickOutput($event)">
        <div table-title>Group By Table</div>
        <div main-table-content>
          <button mat-raised-button>Action Btn</button>
        </div>
      </lyn-dual-detail-table>
    </div>
  `,
  context: {
    isGrouped: true,
    isFilter: true,
    tableHeaders: alertsTableHeaderMethod([{ id: Guid.EMPTY, name: 'Gateway Mocked' }]),
    dualTableOptions: {
      ...new DualDetailTableOptions(),
      mainTableTitle: 'Gateway Alerts',
      detailTableTitle: 'Alert History',
      filterBy: 'gatewayId',
      isMainFilterAction: true,
      isDualFilterAction: true,
      defaultPageSize: 10,
      isDualTextToFind: true,
      dualFindTextColumn: 'emailAddress',
      dualFilterBy: 'emailAddress',
    },
    data: [
      {
        id: Guid.EMPTY,
        lastActivated: moment().format(),
        gatewayId: Guid.EMPTY,
        type: '400XX Error',
        threshold: 25,
        muted: true,
        emailAddress: 'rapid@lyniate.com',
        active: true,
      },
      {
        id: '1234',
        lastActivated: moment().format(),
        gatewayId: '1234',
        type: '400XX Error',
        threshold: 26,
        muted: false,
        emailAddress: 'rapid@lyniate.com',
        active: true,
      },
      {
        id: Guid.EMPTY,
        lastActivated: moment().format(),
        gatewayId: Guid.EMPTY,
        type: '400XX Error',
        threshold: 25,
        muted: true,
        emailAddress: 'rapid@lyniate.com',
        active: true,
      },
      {
        id: '1234',
        lastActivated: moment().format(),
        gatewayId: '1234',
        type: '400XX Error',
        threshold: 26,
        muted: false,
        emailAddress: 'rapid@lyniate.com',
        active: true,
      },
      {
        id: Guid.EMPTY,
        lastActivated: moment().format(),
        gatewayId: Guid.EMPTY,
        type: '400XX Error',
        threshold: 25,
        muted: true,
        emailAddress: 'rapid@lyniate.com',
        active: true,
      },
      {
        id: '1234',
        lastActivated: moment().format(),
        gatewayId: '1234',
        type: '400XX Error',
        threshold: 26,
        muted: false,
        emailAddress: 'rapid@lyniate.com',
        active: true,
      },
      {
        id: Guid.EMPTY,
        lastActivated: moment().format(),
        gatewayId: Guid.EMPTY,
        type: '400XX Error',
        threshold: 25,
        muted: true,
        emailAddress: 'rapid@lyniate.com',
        active: true,
      },
      {
        id: '1234',
        lastActivated: moment().format(),
        gatewayId: '1234',
        type: '400XX Error',
        threshold: 26,
        muted: false,
        emailAddress: 'rapid@lyniate.com',
        active: true,
      },
    ],
    showPagination: true,
    filterBy: 'gatewayId',
    isRowClickable: true,
    rowClickedValue: '',
    dualTableHeaders: AlertHistoryTableHeaders,
    dualData: [
      { id: '1234', muted: true, lastUpdated: moment().format(), emailAddress: 'rapid@lyniate.com' },
      { id: '1234', muted: true, lastUpdated: moment().format(), emailAddress: 'mel@lyniate.com' },
    ],
    cellClickOutput: (param: any) => console.info('Cell Row Clicked:', param),
    generateQueries: () => {
      const a = [];
      for (let i = 0; i < 1000; i++) {
        a.push({
          id: Guid.EMPTY,
          lastActivated: moment().format(),
          gatewayId: Guid.EMPTY,
          type: '400XX Error',
          threshold: 25,
          muted: true,
          emailAddress: 'rapid@lyniate.com',
          active: true,
        });
      }
      return a;
    },
  },
});
