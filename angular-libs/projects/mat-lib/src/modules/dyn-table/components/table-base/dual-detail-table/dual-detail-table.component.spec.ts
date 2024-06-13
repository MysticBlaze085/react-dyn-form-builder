/* eslint-disable @typescript-eslint/no-empty-function */

import { DualDetailTableComponent } from './dual-detail-table.component';
import { LynTableComponent } from '../lyn-table/lyn-table.component';
import { SimpleChange } from '@angular/core';
import { TableBase } from '@core/shared/modules/dyn-table/helpers';

describe('DualDetailTableComponent', () => {
  let component: DualDetailTableComponent;
  beforeEach(() => {
    component = new DualDetailTableComponent({ detectChanges: () => {} } as any);
  });
  describe('ngOnChanges', () => {
    beforeEach(() => {
      component.dualTable = new LynTableComponent({ detectChanges: () => {} } as any);
      component.mainTable = new LynTableComponent({ detectChanges: () => {} } as any);
      const simpleChanges = {
        tableHeaders: new SimpleChange(undefined, [{ ...new TableBase({ headerName: 'name' }) }], true),
        dualTableHeaders: new SimpleChange(undefined, [{ ...new TableBase({ headerName: 'name' }) }], true),
        data: new SimpleChange(undefined, [{ name: 'Testing' }], true),
        dualData: new SimpleChange(undefined, [{ name: 'Testing' }], true),
        filterBy: new SimpleChange(undefined, 'name', true),
        findText: new SimpleChange(undefined, 'testing', true),
        isDualTextToFind: new SimpleChange(undefined, true, true),
        isTextToFind: new SimpleChange(undefined, true, true),
      };
      component.ngOnChanges(simpleChanges);
      component.textToFind(true);
    });
    it('should set ngOnChanges initial values', () => {
      expect(component.tableHeaders).toEqual([{ ...new TableBase({ headerName: 'name' }) }]);
      if (component.data[0].index) expect(component.data[0]).toEqual({ name: 'Testing', index: 1 } as any);
      expect(component.filterBy).toEqual('name');
    });
  });
});
