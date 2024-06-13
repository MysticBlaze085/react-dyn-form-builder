/* eslint-disable @typescript-eslint/no-empty-function */

import { GroupByTableComponent } from './group-by-table.component';
import { SimpleChange } from '@angular/core';
import { TableBase } from '../../helpers';

describe('GroupByTableComponent', () => {
  let component: GroupByTableComponent;

  beforeEach(() => {
    component = new GroupByTableComponent({ detectChanges: () => {} } as any);
  });

  describe('ngOnChanges', () => {
    it('should set ngOnChanges initial values', () => {
      const simpleChanges = {
        tableHeaders: new SimpleChange(
          undefined,
          [
            {
              ...new TableBase({
                headerName: 'name',
                displayGroupByFilter: true,
                cellParamValue: 'Testing' as any,
              }),
            },
          ],
          true
        ),
        data: new SimpleChange(undefined, [{ name: 'Testing Group' }], true),
        filterBy: new SimpleChange(undefined, 'name', true),
      };
      component.ngOnChanges(simpleChanges);
      component.ngAfterViewInit();

      expect(component.tableHeaders).toEqual([
        {
          ...new TableBase({
            headerName: 'name',
            displayGroupByFilter: true,
            cellParamValue: 'Testing' as any,
          }),
        },
      ]);
      expect(component._allData.length).toEqual(1);
      expect(component.filterBy).toEqual('name');
      component.dataSource$.subscribe({
        next: (res: any) => {
          expect(res.length).toEqual(1);
          expect(component.dataSource.data.length).toEqual(2);
        },
        complete: () => {},
      });

      expect(component.groupByColumns).toEqual(['name']);
    });
  });
  describe('filterValueChanges', () => {
    beforeEach(() => {
      const simpleChanges = {
        tableHeaders: new SimpleChange(
          undefined,
          [
            {
              ...new TableBase({
                headerName: 'name',
                displayGroupByFilter: true,
                setHeaderName: () => {
                  return 'changedName';
                },
                cellParamValue: () => 'Testing' as any,
              }),
            },
          ],
          true
        ),
        data: new SimpleChange(undefined, [{ name: 'Testing Group' }], true),
        filterBy: new SimpleChange(undefined, 'name', true),
      };
      component.ngOnChanges(simpleChanges);
      component.ngAfterViewInit();
    });
    it('should filterValueChanges', () => {
      component.filterValueChanges({ filter: 'testing' });
      expect(component.formGroup.value).toEqual({ filter: 'testing' });
    });
    it('should filterValueChanges with null value', () => {
      component.filterValueChanges({ filter: null } as any);
      expect(component.formGroup.value).toEqual({ filter: '' });
      component.filterValueChanges({ filter: undefined } as any);
    });
  });
  describe('displayGroupTitle', () => {
    beforeEach(() => {
      const simpleChanges = {
        tableHeaders: new SimpleChange(
          undefined,
          [
            {
              ...new TableBase({
                headerName: 'name',
                displayGroupByFilter: true,
                setHeaderName: () => {
                  return 'changedName';
                },
                cellParamValue: () => 'Testing' as any,
              }),
            },
          ],
          true
        ),
        data: new SimpleChange(undefined, [{ name: 'Testing Group' }], true),
        filterBy: new SimpleChange(undefined, 'name', true),
      };
      component.ngOnChanges(simpleChanges);
      component.ngAfterViewInit();
    });
    it('should display group title where both setHeaderName and CellParamValue are truthy', () => {
      expect(component.displayGroupTitle('name', component.dataSource.data[0])).toEqual('Testing (1)');
    });
    it('should display group title where both setHeaderName and CellParamValue are false', () => {
      expect(component.displayGroupTitle('changedName', component.dataSource.data[0])).toEqual('Changed Name (1)');
    });
    it('should display group title where both setHeaderName is true and CellParamValue is false', () => {
      const simpleChanges = {
        tableHeaders: new SimpleChange(
          undefined,
          [
            {
              ...new TableBase({
                headerName: 'name',
                displayGroupByFilter: true,
                setHeaderName: () => {
                  return 'changedName';
                },
              }),
            },
          ],
          true
        ),
        data: new SimpleChange(undefined, [{ name: 'Testing Group' }], true),
        filterBy: new SimpleChange(undefined, 'name', true),
      };
      component.ngOnChanges(simpleChanges);
      component.ngAfterViewInit();

      expect(component.displayGroupTitle('name', component.dataSource.data[0])).toEqual('Testing Group (1)');
    });
  });
  describe('groupBy', () => {
    beforeEach(() => {
      const simpleChanges = {
        tableHeaders: new SimpleChange(
          undefined,
          [
            {
              ...new TableBase({
                headerName: 'name',
                displayGroupByFilter: true,
                setHeaderName: () => {
                  return 'changedName';
                },
                cellParamValue: () => 'Testing' as any,
              }),
            },
          ],
          true
        ),
        data: new SimpleChange(undefined, [{ name: 'Testing Group' }], true),
        filterBy: new SimpleChange(undefined, 'name', true),
      };
      component.ngOnChanges(simpleChanges);
      component.ngAfterViewInit();
    });
    it('should unGroup by column name', () => {
      expect(component.dataSource.data.length).toEqual(2);
      component.unGroupBy(new MouseEvent('click'), 'name');
      expect(component.dataSource.data.length).toEqual(1);
    });
    it('should group by column name', () => {
      expect(component.dataSource.data.length).toEqual(2);
      component.unGroupBy(new MouseEvent('click'), 'name');
      expect(component.dataSource.data.length).toEqual(1);
      component.groupBy(new MouseEvent('click'), 'name');
      component.isGroup(1, { index: 1 });
      expect(component.dataSource.data.length).toEqual(2);
    });
  });
});
