import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Table } from '../models';
import { TableComponent } from './table.component';

@Component({
  standalone: true,
  selector: 'adk-tables',
  imports: [CommonModule, TableComponent],
  template: `
    <div [class]="wrapperClass">
      <adk-table
        [table]="tableConfig"
        [showClear]="showClear"
        (buttonClick)="buttonClick.emit($event)"
        (selectedRowsEmitValue)="selectedRowsEmitValue.emit($event)"
        (actionButtonSelection)="actionButtonSelection.emit($event)"
      ></adk-table>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class TablesComponent implements OnChanges {
  @ViewChild(TableComponent) tableComponent!: TableComponent;

  @Input() tableConfig!: Table;
  @Input() wrapperClass = 'mt-2 grid grid-cols-1 gap-x-4 gap-y-4 p-4 h-[calc(100vh-210px)] overflow-y-auto';
  @Input() showClear = false;

  @Output() selectedRowsEmitValue = new EventEmitter<any[]>();
  @Output() actionButtonSelection = new EventEmitter<any | any[]>();
  @Output() buttonClick = new EventEmitter();

  ngOnChanges({ tableConfig, wrapperClass, showClear }: SimpleChanges): void {
    if (tableConfig) this.tableConfig = tableConfig.currentValue;
    if (wrapperClass) this.wrapperClass = wrapperClass.currentValue;
    if (showClear) this.showClear = showClear.currentValue;
  }

  clear() {
    this.tableComponent.clear();
  }
}
