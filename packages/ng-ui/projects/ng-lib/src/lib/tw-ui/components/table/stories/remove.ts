// import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

// import { CommonModule } from '@angular/common';
// import { Table } from '../models';
// import { TableComponent } from './table.component';

// @Component({
//     standalone: true,
//     selector: 'adk-tables',
//     imports: [CommonModule, TableComponent],
//     template: `
//         <div [class]="wrapperClass">
//             <adk-table
//                 [table]="tableConfig"
//                 [showClear]="showClear"
//                 (buttonClick)="buttonClick.emit($event)"
//                 (selectedRowsEmitValue)="selectedRowsEmitValue.emit($event)"
//                 (actionButtonSelection)="actionButtonSelection.emit($event)"
//             ></adk-table>
//         </div>
//     `,
//     styles: [
//         `
//             :host {
//                 display: block;
//             }
//         `,
//     ],
// })
// export class TablesComponent implements OnChanges {
//     @ViewChild(TableComponent) tableComponent!: TableComponent;

//     @Input() tableConfig!: Table;
//     @Input() wrapperClass = 'mt-2 grid grid-cols-1 gap-x-4 gap-y-4 p-4 h-[calc(100vh-210px)] overflow-y-auto';
//     @Input() showClear = false;

//     @Output() selectedRowsEmitValue = new EventEmitter<any[]>();
//     @Output() actionButtonSelection = new EventEmitter<any | any[]>();
//     @Output() buttonClick = new EventEmitter();

//     ngOnChanges({ tableConfig, wrapperClass, showClear }: SimpleChanges): void {
//         if (tableConfig) this.tableConfig = tableConfig.currentValue;
//         if (wrapperClass) this.wrapperClass = wrapperClass.currentValue;
//         if (showClear) this.showClear = showClear.currentValue;
//     }

//     clear() {
//         this.tableComponent.clear();
//     }
// }

// /* eslint-disable no-prototype-builtins */

// import { AsyncPipe, CommonModule } from '@angular/common';
// import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
// import { Identifiable, Table } from '../../models';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { AdkDatasource } from '../data-source';
// import { AdkFormGroup } from '../../directives';
// import { ButtonComponent } from '../../../tw-ui';
// import { FieldComponent } from '../field.component';
// import { PillComponent } from '../../../tw-ui/components/pill.component';

// @Component({
//     selector: 'adk-default-table',
//     standalone: true,
//     imports: [CommonModule, AsyncPipe, ReactiveFormsModule, FieldComponent, ButtonComponent, PillComponent, FormsModule],
//     hostDirectives: [AdkFormGroup, AdkDatasource],
//     template: `
//         <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-md bg-clip-border">
//             <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
//                 <div class="flex items-center justify-between gap-8 mb-8">
//                     <div>
//                         @if(title) {
//                         <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
//                             {{ title }}
//                         </h5>
//                         } @if(caption) {
//                         <p class="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
//                             {{ caption }}
//                         </p>
//                         }
//                     </div>
//                     <div class="flex flex-col gap-2 shrink-0 sm:flex-row">
//                         @if(showClear) {
//                         <span (click)="clear()" class="cursor-pointer p-0 !m-auto material-symbols-outlined px-2"> restart_alt </span>
//                         } @if(buttonText && buttonLink && buttonAction === undefined) {
//                         <span class="grow"></span>
//                         <adk-button (click)="buttonClick.emit(buttonLink)">
//                             <span>{{ buttonText }}</span>
//                         </adk-button>
//                         } @if (buttonText && buttonAction === 'selectedRowsWFieldSelection') {
//                         <adk-button (click)="actionButtonClicked()">
//                             <span>{{ buttonText }}</span>
//                         </adk-button>
//                         }
//                     </div>
//                 </div>
//                 <table class="w-full text-left table-auto">
//                     @if(headers) {
//                     <thead>
//                         <tr>
//                             @if(selectable) {
//                             <th scope="col" class="p-4 border-b border-blue-gray-100 bg-blue-gray-50"></th>
//                             <!-- Show the select column only if selectable is true -->
//                             } @for (key of headers; track key) {
//                             <th scope="col" class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
//                                 <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
//                                     {{ key | uppercase }}
//                                 </p>
//                             </th>
//                             }
//                         </tr>
//                     </thead>
//                     }
//                     <tbody class="h-100%">
//                         @for (item of datasource.items(); track (item.id); let i = $index) {
//                         <tr [class.selected]="item.selected">
//                             @if(selectable) {
//                             <td class="p-4 border-b border-blue-gray-50">
//                                 <!-- Show the select cell only if selectable is true -->
//                                 <input
//                                     [checked]="datasource.selected(item.id)"
//                                     (click)="toggleRowSelection(item)"
//                                     type="checkbox"
//                                     class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                                 />
//                             </td>
//                             } @for (key of headers; track key) { @if (hasField(item, key)) {
//                             <td *ngIf="this.datasource.selected(item.id)">
//                                 <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//                                     <adk-field [field]="item[key]"></adk-field>
//                                 </p>
//                             </td>
//                             } @else {
//                             <td class="p-4 border-b border-blue-gray-50">
//                                 @if (isValueArray(item[key])) { @for (val of item[key]; track val) {
//                                 <adk-pill>{{ val }}</adk-pill>
//                                 } } @else { {{ item[key] }} }
//                             </td>
//                             } }
//                         </tr>
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     `,
//     styles: [
//         `
//             :host {
//                 display: block;
//             }
//             .table {
//                 thead {
//                     height: 45px;
//                 }

//                 tbody {
//                     tr {
//                         height: 45px;
//                     }
//                 }
//             }
//         `,
//     ],
//     changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class DefaultTableComponent implements OnChanges {
//     datasource = inject(AdkDatasource<Identifiable>, { self: true });
//     #formGroup = inject(AdkFormGroup, { self: true });
//     @Input() showClear = false;
//     @Input() table!: Table;

//     @Output() selectedRowsEmitValue = new EventEmitter<any[]>();
//     @Output() actionButtonSelection = new EventEmitter<any | any[]>();
//     @Output() buttonClick = new EventEmitter();

//     get formGroup() {
//         return this.#formGroup.formGroup();
//     }

//     get headers() {
//         return this.table?.headers ?? [];
//     }

//     get props() {
//         return this.table?.props;
//     }

//     get title() {
//         return this.props?.title;
//     }

//     get caption() {
//         return this.props?.caption;
//     }

//     get buttonText() {
//         return this.props?.buttonText;
//     }

//     get buttonLink() {
//         return this.props?.buttonLink ?? [];
//     }

//     get buttonAction() {
//         return this.props?.buttonAction;
//     }

//     get selectable() {
//         return this.props?.selectable ?? false;
//     }

//     get height() {
//         return this.props?.height ?? 'h-auto';
//     }

//     ngOnChanges({ table }: SimpleChanges): void {
//         if (table) {
//             this.table = table.currentValue;
//             this.datasource.fetch(this.table.rows);
//             this.selectedRowsEmit();
//         }
//     }

//     mapSelectedRows() {
//         return {
//             selectedRows: this.datasource.selectedItems(),
//             formGroupValues: this.formGroup.value,
//         };
//     }

//     hasField(row: any, key: string): boolean {
//         return row[key] instanceof Object && row[key].type !== undefined;
//     }

//     buttonClicked(buttonLink: any[]) {
//         this.buttonClick.emit(buttonLink);
//     }

//     actionButtonClicked() {
//         this.actionButtonSelection.emit(this.mapSelectedRows());
//     }

//     isValueArray(value: any): boolean {
//         return Array.isArray(value);
//     }

//     toggleRowSelection(row: any): void {
//         this.datasource.selected(row.id) ? this.datasource.deselect(row.id) : this.datasource.select(row.id);
//         row.selected = this.datasource.selected(row.id);
//         this.selectedRowsEmit();
//     }

//     selectedRowsEmit() {
//         this.selectedRowsEmitValue.emit(this.datasource.selectedItems());
//     }

//     clear() {
//         this.datasource.reset();
//         this.selectedRowsEmit();
//     }
// }

// export declare type RowData = {
//     [additionalProperties: string]: any;
// } & {
//     [key: string]: any;
//     selected?: boolean;
//     id?: string;
// };
