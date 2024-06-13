/* eslint-disable @typescript-eslint/no-empty-function */

import { CellButton, TableBase } from '../../helpers';
import { InsightColorEnums, InsightIconEnums } from '@core/shared/modules/lyn-insight-icon/models';

import { GatewayData } from '@v1/client/modules/monitoring/containers/gateways/api';
import { SimpleChange } from '@angular/core';
import { TableBaseComponent } from './table-base.component';
import { of } from 'rxjs';

export class MockMatPaginator {
  page = of();
}

describe('TableBaseComponent', () => {
  let component: TableBaseComponent;

  beforeEach(() => {
    component = new TableBaseComponent({ detectChanges: () => {} } as any);
  });

  describe('ngOnChanges', () => {
    it('should set ngOnChanges initial values', () => {
      const simpleChanges = {
        tableHeaders: new SimpleChange(undefined, [{ ...new TableBase({ headerName: 'name' }) }], true),
        data: new SimpleChange(undefined, [{ name: 'Testing' }], true),
        filterBy: new SimpleChange(undefined, 'name', true),
        findText: new SimpleChange(undefined, 'testing', true),
      };
      component.ngOnChanges(simpleChanges);
      component.ngAfterViewInit();

      expect(component.tableHeaders).toEqual([{ ...new TableBase({ headerName: 'name' }) }]);

      expect(component.data).toEqual([{ name: 'Testing' }] as any[]);
      expect(component.filterBy).toEqual('name');
      expect(component.findText).toEqual('testing');
    });
  });

  describe('hiddenButton', () => {
    it('should output false', () => {
      const tableHeader = new CellButton({
        headerName: 'edit',
        headerHidden: true,
        dataCy: 'table-data-cy-edit',
        icon: { color: InsightColorEnums.DEFAULT, icon: InsightIconEnums.EDIT, text: 'Edit Gateway' },
        cellParam: (param: GatewayData) => {
          return { path: ['/configurations/apiproxies'], queryParams: { editGateway: true, type: param.gatewayType, id: param.gatewayId } };
        },
        hiddenCellButton: () => undefined,
      });
      expect(component.hiddenButton(tableHeader.hiddenCellButton(undefined))).toBeFalsy();
    });
    it('should output true', () => {
      const tableHeader = new CellButton({
        headerName: 'edit',
        headerHidden: true,
        dataCy: 'table-data-cy-edit',
        icon: { color: InsightColorEnums.DEFAULT, icon: InsightIconEnums.EDIT, text: 'Edit Gateway' },
        cellParam: (param: GatewayData) => {
          return { path: ['/configurations/apiproxies'], queryParams: { editGateway: true, type: param.gatewayType, id: param.gatewayId } };
        },
        hiddenCellButton: () => true,
      });
      expect(component.hiddenButton(tableHeader.hiddenCellButton('edit'))).toBeTruthy();
    });
  });
  describe('cellClick', () => {
    it('should output row value and toggle selection', () => {
      spyOn(component.rowValue, 'emit');
      spyOn(component.selection, 'toggle');
      component.cellClick({ name: 'Testing' });
      expect(component.selection.toggle).toHaveBeenCalledOnceWith({ name: 'Testing' });
      expect(component.rowValue.emit).toHaveBeenCalled();
    });
  });
  describe('filterValueChanges', () => {
    beforeEach(() => {
      const simpleChanges = {
        tableHeaders: new SimpleChange(undefined, [{ ...new TableBase({ headerName: 'name' }) }], true),
        data: new SimpleChange(undefined, [{ name: 'Testing' }], true),
        filterBy: new SimpleChange(undefined, 'name', true),
        findText: new SimpleChange(undefined, 'testing', true),
      };
      component.ngOnChanges(simpleChanges);
      component.ngAfterViewInit();
    });
    it('should filterValueChanges', () => {
      component.filterValueChanges({ filter: 'testing' });
      expect(component.formGroup.value).toEqual({ filter: 'testing' });
      expect(component.dataSource.filter).toEqual('testing');
    });
    it('should filterValueChanges with null value', () => {
      component.filterValueChanges({ filter: null } as any);
      expect(component.formGroup.value).toEqual({ filter: '' });
      expect(component.dataSource.filter).toEqual('');
    });
  });

  describe('searchTextDirection', () => {
    it('should emit searchTextDirection forward search is true', () => {
      spyOn(component.textToFindAction, 'emit');
      component.searchTextDirection(true);
      expect(component.textToFindAction.emit).toHaveBeenCalledWith(true);
    });
    it('should emit searchTextDirection forward search is false', () => {
      spyOn(component.textToFindAction, 'emit');
      component.searchTextDirection(false);
      expect(component.textToFindAction.emit).toHaveBeenCalledWith(false);
    });
  });

  describe('findTextDirection', () => {
    beforeEach(() => {
      const simpleChanges = {
        tableHeaders: new SimpleChange(undefined, [{ ...new TableBase({ headerName: 'name' }) }], true),
        data: new SimpleChange(undefined, [{ name: 'Testing' }], true),
        filterBy: new SimpleChange(undefined, 'name', true),
        findText: new SimpleChange(undefined, 'testing', true),
      };
      component.ngOnChanges(simpleChanges);
      component.ngAfterViewInit();
    });
    it('should search forward true', () => {
      component.findTextDirection(true);
      expect(component.findText).toEqual('testing');
    });
    it('should search forward false', () => {
      component.findText = null as any;
      component.findTextDirection(false);
      expect(component.findText).toEqual(null as any);
    });
  });
});
