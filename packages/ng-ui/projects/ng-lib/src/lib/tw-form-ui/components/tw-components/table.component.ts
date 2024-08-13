import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'adk-table',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
    template: `
        <div class="w-full px-4">
            <div class="flex flex-row items-center w-full">
                <div class="items-center w-fit">
                    <h3 class="text-base font-semibold text-gray-900">{{ title }}</h3>
                    @if(caption) {
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ caption }}</p>
                    }
                </div>
                @if(buttonText) {
                <span class="grow"></span>
                <button
                    type="button"
                    class="-m-2.5 flex items-center justify-center rounded-md p-1.5 atom-btn-primary"
                    [routerLink]="buttonLink"
                    (click)="selectedRowsEmit()"
                >
                    <span class="text-xs">{{ buttonText }}</span>
                </button>
                }
            </div>
        </div>
        <div class="flex flex-row mt-4" [ngClass]="height">
            <table class="table w-[100%]" *ngIf="headers.length && data && data.length">
                @if(headers) {
                <thead class="bg-gray-200">
                    <tr>
                        @if(selectable) {
                        <th scope="col" class="text-sm font-medium">Select</th>
                        <!-- Show the select column only if selectable is true -->
                        } @for (key of keys; track key) {
                        <th scope="col" class="text-sm font-medium">{{ key | uppercase }}</th>
                        }
                    </tr>
                </thead>
                } @if (data.length) {
                <tbody class="h-100%">
                    @for (item of data; track item.id) {
                    <tr [class.selected]="item.selected" (click)="toggleRowSelection(item)">
                        @if(selectable) {
                        <td>
                            <!-- Show the select cell only if selectable is true -->
                            <input
                                [(ngModel)]="item.selected"
                                type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-600"
                            />
                        </td>
                        } @for (key of keys; track key) {
                        <td>
                            @if (isValueArray(item[key])) { @for (val of item[key]; track val) {
                            <span class="badge badge-pill mr-0.5" [ngClass]="getRandomColor()">{{ val }}</span>
                            } } @else { {{ item[key] }} }
                        </td>
                        }
                    </tr>
                    }
                </tbody>
                }
            </table>
        </div>
    `,
    styles: [
        `
            :host {
                display: block;
            }
            .table {
                thead {
                    height: 45px;
                }

                tbody {
                    tr {
                        height: 45px;
                    }
                }

                td {
                    text-align: center;
                }
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnChanges {
    @Input() height = 'h-auto';
    @Input() title = 'Default Title';
    @Input() caption?: string;
    @Input() buttonText!: string;
    @Input() buttonLink: any[] = [];
    @Input() headers: string[] = [];
    @Input() selectable = false;
    @Input() data: any = [];

    @Output() selectedRowsEmitValue = new EventEmitter<any>();

    keys = Array.isArray(this.data) && this.data.length ? Object.keys(this.data[0]) : Object.keys(this.data);
    colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];
    selectedRows: any[] = [];

    ngOnChanges({ headers, data, buttonLink }: SimpleChanges): void {
        if (buttonLink) this.buttonLink = buttonLink.currentValue;
        if (headers) this.keys = headers.currentValue;
        if (data) {
            if (Array.isArray(data.currentValue)) {
                this.data = data.currentValue;
            } else {
                this.data = [data.currentValue];
            }
        }
    }

    getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    isValueArray(value: any): boolean {
        return Array.isArray(value);
    }

    toggleRowSelection(row: any): void {
        row.selected = !row.selected;
        const index = this.selectedRows.findIndex((item) => item === row);
        if (index > -1) {
            this.selectedRows.splice(index, 1);
        } else {
            this.selectedRows.push(row);
        }
    }

    selectedRowsEmit() {
        this.selectedRowsEmitValue.emit(this.selectedRows);
    }
}
