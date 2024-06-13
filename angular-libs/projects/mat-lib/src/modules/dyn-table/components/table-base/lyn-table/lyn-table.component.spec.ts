import { LynTableComponent } from './lyn-table.component';
import { SimpleChange } from '@angular/core';
import { TableBase } from '@core/shared/modules/dyn-table/helpers';

describe('LynTableComponent', () => {
  let component: LynTableComponent;
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    component = new LynTableComponent({ detectChanges: () => {} } as any);
  });
  describe('ngOnChanges', () => {
    it('should set ngOnChanges initial values groupBy', () => {
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
      expect(component.dataSource.data.length).toEqual(2);
      expect(component.groupByColumns).toEqual(['name']);
    });
    it('should set ngOnChanges initial values not using groupBy', () => {
      const simpleChanges = {
        tableHeaders: new SimpleChange(
          undefined,
          [
            {
              ...new TableBase({
                headerName: 'name',
                displayGroupByFilter: false,
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
            displayGroupByFilter: false,
            cellParamValue: 'Testing' as any,
          }),
        },
      ]);
      expect(component.filterBy).toEqual('name');
      expect(component.dataSource.data.length).toEqual(1);
    });
  });
});
