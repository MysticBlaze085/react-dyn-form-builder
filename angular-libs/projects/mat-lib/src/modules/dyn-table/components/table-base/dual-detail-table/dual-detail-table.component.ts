/* eslint-disable @typescript-eslint/no-useless-constructor */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { ITableHeaderControlModel } from '@core/shared/modules/dyn-table/models';
import { LynTableComponent } from '../lyn-table/lyn-table.component';

@Component({
  selector: 'lyn-dual-detail-table',
  templateUrl: './dual-detail-table.component.html',
  styleUrls: ['./dual-detail-table.component.scss'],
})
export class DualDetailTableComponent extends LynTableComponent implements OnChanges, AfterViewInit {
  /**
   * Main Table Controls
   */
  @ViewChild('mainTable') mainTable!: LynTableComponent;
  @Input() public isMainFilterAction: boolean = false;
  @Input() public mainTableTitle: string = 'Main Data';
  @Input() public noRecordsFoundMessage: string = 'No records found';
  @Output() public mainTableSelectionList: EventEmitter<any[]> = new EventEmitter<any[]>();
  /**
   * Dual Table Controls
   */
  @ViewChild('dualTable') dualTable!: LynTableComponent;
  @Input() public dualTableHeaders!: ITableHeaderControlModel[];
  @Input() public dualData!: any[];
  @Input() public detailTableTitle: string = 'Details';
  @Input() public isDualFilterAction: boolean = false;
  @Input() public isDualTextToFind: boolean = false;
  @Input() public dualFindTextColumn: string = '';
  @Input() public dualFilterBy!: string;
  @Input() public dualNoRecordsFoundMessage: string = 'No records found';
  @Input() public isDualSearching: boolean = false;
  @Output() public dualTableSelectionList: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor(public changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  public ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  public ngOnChanges({
    tableHeaders,
    data,
    filterBy,
    filterByGroupValue,
    isFormFilterLabel,
    dualTableHeaders,
    dualData,
    isDualSearching,
  }: SimpleChanges): void {
    super.ngOnChanges({ tableHeaders, data, filterBy, filterByGroupValue, isFormFilterLabel });
    if (dualTableHeaders?.currentValue) this.dualTableHeaders = dualTableHeaders.currentValue;
    if (dualData?.currentValue) this.dualData = dualData.currentValue;
    if (isFormFilterLabel?.currentValue) this.isFormFilterLabel = isFormFilterLabel.currentValue;
    if (filterBy?.currentValue) this.filterBy = filterBy.currentValue;
    if (isDualSearching?.currentValue) this.isDualSearching = filterByGroupValue.currentValue;
  }
  public textToFind(searchForward: boolean) {
    if (this.isDualTextToFind && this.dualTable) {
      this.dualTable.findTextDirection(searchForward);
    }

    if (this.isTextToFind && this.mainTable) {
      this.mainTable.findTextDirection(searchForward);
    }
  }
  public emitSelectionList(data: any[]) {
    if (data) this.mainTableSelectionList.emit(data);
    this.dualTableSelectionList.emit(data);
  }
}
