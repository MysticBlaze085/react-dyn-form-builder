import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DefaultTableComponent } from './types/default-table.component';
import { Table } from '../models';

const components = [DefaultTableComponent];

@Component({
  standalone: true,
  selector: 'adk-table',
  imports: [CommonModule, ...components],
  template: `
    @if(table) { @switch (type) { @default {
    <adk-default-table
      [table]="table"
      [showClear]="showClear"
      (buttonClick)="buttonClick.emit($event)"
      (selectedRowsEmitValue)="selectedRowsEmitValue.emit($event)"
      (actionButtonSelection)="actionButtonSelection.emit($event)"
    ></adk-default-table>
    } } }
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class TableComponent implements OnChanges {
  @ViewChild(DefaultTableComponent) defaultTableComponent!: DefaultTableComponent;

  @Input() table!: Table;
  @Input() showClear = false;

  @Output() selectedRowsEmitValue = new EventEmitter<any[]>();
  @Output() actionButtonSelection = new EventEmitter<any | any[]>();
  @Output() buttonClick = new EventEmitter();

  get type() {
    return this.table['type'];
  }

  get props() {
    return this.table?.props;
  }

  ngOnChanges({ table }: SimpleChanges): void {
    if (table) this.table = table.currentValue;
  }

  clear() {
    this.defaultTableComponent.clear();
  }
}
