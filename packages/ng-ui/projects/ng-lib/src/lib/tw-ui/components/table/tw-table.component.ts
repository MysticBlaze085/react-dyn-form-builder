import { AsyncPipe, CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    inject,
} from '@angular/core';
import { SortableIconComponent, cellSelector } from './utils';

import { AdkExpansionPanelComponent } from '../expansion-panel.component';
import { AdkSelection } from '../../../tw-form-ui/directives';
import { AdkTooltipDirective } from '../../../tw-form-ui/directives/tooltip';
import { CheckboxComponent } from '../../../tw-form-ui/components/types/checkbox.component';
import { Field } from '../../../tw-form-ui';
import { FieldComponent } from '../../../tw-form-ui/components/field.component';
import { ImperativeObservable } from '../../../utils';
import { Observable } from 'rxjs';
import { RowData } from './models';
import { TableDataSourceService } from './table-datasource.service';
import { TwTypographyComponent } from '../typography.component';

@Component({
  selector: 'tw-default-table',
  templateUrl: './tw-table.component.html',
  standalone: true,
  imports: [
    CommonModule,
    AdkSelection,
    AdkTooltipDirective,
    AdkExpansionPanelComponent,
    AsyncPipe,
    TwTypographyComponent,
    CheckboxComponent,
    SortableIconComponent,
    FieldComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class TwDefaultTableComponent implements OnChanges, OnDestroy {
  @ViewChild('selection', { static: true }) selection: any;
  @Input() isSelectable = false;
  @Input() isMultiSelectField = false;
  @Input() isSortable = false;
  @Input() isDraggable = false;
  @Input() headers: string[] = [];
  @Input() actionColName?: string;
  @Input() actionButton?: TemplateRef<any> | string;
  @Input() rows: RowData[] = [];
  @Input() groupBy = '';
  @Input() isPaginationAction?: boolean;
  @Input() isActionChange?: boolean;

  tdss: TableDataSourceService = inject(TableDataSourceService);
  datasource = this.tdss.get('dataSource');
  // maybe add groupData to the state management service
  groupData = new ImperativeObservable<{ [key: string]: RowData[] }>({ key: this.tdss.get('dataSource') });
  selectedRows = new ImperativeObservable<RowData[]>(this.tdss.get('selectedRows'));
  selectedRow = new ImperativeObservable<RowData | null>(null);
  isAllRowsSelected = new ImperativeObservable<boolean>(this.selectedRows.value.length === this.datasource.length);
  selectedIndex = new ImperativeObservable<number>(this.tdss.get('draggedColIndex') ?? 0);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['headers']) this.tdss.setHeaders(changes['headers'].currentValue);
    if (changes['rows']) this.tdss.setTableDataSource(changes['rows'].currentValue);
    if (changes['isActionChange']) {
      if (!changes['isActionChange'].firstChange) {
        this.headers = this.tdss.get('headers');
        this.rows = this.tdss.get('dataSource');
      }
    }
    if (changes['isPaginationAction'])
      this.groupData.value = this.groupByData(this.tdss.get('dataSource'), this.tdss.get('preferences').groupBy ?? '');
    if (changes['isSelectable']) this.isSelectable = changes['isSelectable'].currentValue;
    if (changes['isMultiSelectField']) this.isMultiSelectField = changes['isMultiSelectField'].currentValue;
    if (changes['isSortable']) this.isSortable = changes['isSortable'].currentValue;
    if (changes['isDraggable']) this.isDraggable = changes['isDraggable'].currentValue;
    if (changes['groupBy']) this.tdss.setGroupBy(changes['groupBy'].currentValue);
    this.updateGroupData();
    this.sortRows('');
  }

  ngOnDestroy(): void {
    this.tdss.clear();
  }

  cellMultiSelector(value: string[]): Observable<Field> {
    const field = new ImperativeObservable<Field>(cellSelector(value));
    return field.change$;
  }

  isCellValArray(value: string | []) {
    return Array.isArray(value);
  }

  isCellFieldObject(value: Field | any) {
    console.log('value field', value);
    if (typeof value === 'object') return true;
    return false;
  }

  private updateGroupData(): void {
    const groupByVar = this.tdss.get('preferences').groupBy;
    const groupData =
      groupByVar && groupByVar !== ''
        ? this.groupByData(this.tdss.get('dataSource'), groupByVar)
        : ({ key: this.tdss.get('dataSource') } as { [key: string]: RowData[] });
    this.groupData.value = { ...groupData };
  }

  objectKeysGroupData(obj: any): any {
    return Object.keys(obj);
  }

  private groupByData(array: RowData[], key: string): { [key: string]: RowData[] } {
    const gKey = key.toLowerCase();
    return array.reduce((result, currentValue) => {
      const normalizedCurrentValue: RowData = Object.keys(currentValue).reduce((acc, k) => {
        acc[k.toLowerCase()] = currentValue[k];
        return acc;
      }, {} as RowData);

      const groupKey = normalizedCurrentValue[gKey] as string;
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(currentValue);
      return result;
    }, {} as { [key: string]: RowData[] });
  }

  isSelected(row: RowData): boolean {
    const selectedRowStr = JSON.stringify(this.selectedRow.value);
    const rowStr = JSON.stringify(row);
    return selectedRowStr === rowStr;
  }

  get allRowsSelected(): boolean {
    const dataSource = this.tdss.get('dataSource');
    const selectedRows = this.tdss.get('selectedRows');
    return dataSource.length > 0 && selectedRows.length === dataSource.length;
  }

  isRowSelected(rowData: any): boolean {
    return this.selectedRows.value.some((selectedRow: any) => JSON.stringify(selectedRow) === JSON.stringify(rowData));
  }
  /**
   * isSelectable actions
   * @param event
   * @param groupKey
   */
  toggleSelectAll(event: Event, groupKey: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.tdss.toggleSelectedAllRows();
      this.groupData.value[groupKey].forEach((item) => this.selection.select(item));
    } else {
      this.tdss.toggleSelectedAllRows();
      this.selection.clear();
    }
  }

  toggleSelectItem(row: object): void {
    const itemStr = JSON.stringify(row);
    if (this.selection.selected(itemStr)) {
      this.selection.deselect(itemStr);
    } else {
      this.selection.select(itemStr);
    }
    this.tdss.setSelectedRows(row);
  }

  sortRows(key: string): void {
    const currentDirection = this.tdss.get('sortDataSource').direction;
    const newDirection: 'ascending' | 'descending' = currentDirection === 'ascending' ? 'descending' : 'ascending';
    this.tdss.sortDataSource({ key, direction: newDirection });
    this.updateGroupData();
  }
  /**
   *  Drag and Drop Handlers
   * @param index
   */
  handleDragStart(index: number): void {
    this.tdss.dragStart(index);
  }

  handleDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  handleDrop(index: number, event: DragEvent): void {
    event.preventDefault();
    this.tdss.dragDrop(index);
    this.headers = this.tdss.get('headers');
    this.groupData.value = this.groupByData(this.tdss.get('dataSource'), this.groupBy);
  }
}
