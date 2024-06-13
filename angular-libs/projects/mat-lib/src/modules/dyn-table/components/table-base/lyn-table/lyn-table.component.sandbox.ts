import { CellIcon, TableBase } from '../../../helpers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ITableHeaderControlModel, TABLE_CELL_ENUMS } from '../../../models';
import { InsightColorEnums, InsightIconEnums } from '@core/shared/modules/lyn-insight-icon/models';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from '@core/shared/modules';
import { CmlToTitleCasePipe } from '@core/shared/pipes/cmlToTitleCase.pipe';
import { DynFormModule } from '@core/shared/modules/dyn-form-control/dyn-form.module';
import { GhostTableComponent } from '../../ghost-table/ghost-table.component';
import { Guid } from 'guid-typescript';
import { LynDynFormModule } from '@core/shared/modules/lyn-dyn-form/lyn-dyn-form.module';
import { LynInsightIconModule } from '@core/shared/modules/lyn-insight-icon/lyn-insight-icon.module';
import { LynTableComponent } from './lyn-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { isEqual } from 'lodash';
import moment from 'moment';
import { sandboxOf } from 'angular-playground';

const alertsTableHeaderMethod = (gatewaysList: { name?: string; id?: string }[]) => {
  const columns: ITableHeaderControlModel[] = [
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
        color: InsightColorEnums.SUCCESS,
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

const baseTableHeaders = (gatewaysList: { name?: string; id?: string }[]) => {
  const columns: ITableHeaderControlModel[] = [
    { ...new TableBase({ headerName: 'id', hidden: true }) },
    {
      ...new TableBase({
        cellType: TABLE_CELL_ENUMS.GROUP_FILTER,
        headerName: 'gatewayId',
        dataCy: 'table-data-cy-gatewayName',
        displayGroupByFilter: false,
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
        color: InsightColorEnums.SUCCESS,
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

export default sandboxOf(LynTableComponent, {
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    LynInsightIconModule,
    MatPaginatorModule,
    LynDynFormModule,
    DynFormModule,
  ],
  declarations: [CmlToTitleCasePipe, GhostTableComponent],
})
  .add('Dynamic Group By Table Component', {
    template: `
    <div style="margin: 0.5rem;">
     <lyn-table [isFilter]="isFilter" [isTextToFind]="isTextToFind" [data]="generateQueries()" [tableHeaders]="tableHeaders" [showPagination]="true" [filterBy]="'gatewayId'" [isRowClickable]="true" (rowValue)="rowClickedValue = cellClickOutput($event)">
      <div table-title>Group By Table</div>
     </lyn-table>
     <pre>{{ rowClickedValue | json}}</pre>
    </div>
  `,
    context: {
      isTextToFind: false,
      isFilter: true,
      tableHeaders: alertsTableHeaderMethod([{ id: Guid.EMPTY, name: 'Gateway Mocked' }]),
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
      ],
      showPagination: true,
      filterBy: 'gatewayId',
      isRowClickable: true,
      rowClickedValue: '',
      cellClickOutput: (param: any) => param,
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
  })
  .add('Dynamic Base Table', {
    template: `
  <div style="margin: 0.5rem;">
   <lyn-table #table [isFilter]="isFilter" [defaultPageSize]="10" [isTextToFind]="isTextToFind" [findTextColumn]="'type'" [data]="generateQueries()" [tableHeaders]="tableHeaders" [showPagination]="true" [filterBy]="'gatewayId'" [isRowClickable]="true" (rowValue)="rowClickedValue = cellClickOutput($event)" (textToFindAction)="table.findTextDirection($event)">
    <div table-title>Base Table</div>
   </lyn-table>
   <pre>{{ rowClickedValue | json}}</pre>

  </div>
`,
    context: {
      isTextToFind: true,
      isFilter: true,
      tableHeaders: baseTableHeaders([{ id: Guid.EMPTY, name: 'Gateway Mocked' }]),
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
          id: '1234',
          lastActivated: moment().format(),
          gatewayId: '1234',
          type: '401 Error',
          threshold: 26,
          muted: false,
          emailAddress: 'rapid@lyniate.com',
          active: true,
        },
      ],
      isData: (param: any[], param2: any[]) => !isEqual(param, param2),
      showPagination: true,
      filterBy: 'gatewayId',
      isRowClickable: true,
      rowClickedValue: '',
      cellClickOutput: (param: any) => param,
      generateQueries: () => {
        const a: any[] = [];
        for (let i = 0; i < 1000; i++) {
          a.push({
            id: '1234',
            lastActivated: moment().format(),
            gatewayId: '1234',
            type: '400XX Error',
            threshold: 26,
            muted: false,
            emailAddress: 'rapid@lyniate.com',
            active: true,
          });
        }
        return a;
      },
    },
  });
