import { Component, Input, OnInit, inject } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { AdkTable } from '../table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-dummy-table',
    standalone: true,
    imports: [CommonModule, FormsModule, AdkTable],
    hostDirectives: [AdkTable],
    template: `
        <select [(ngModel)]="filterColumn" (change)="onFilterColumnChange($event.target.value)">
            <option *ngFor="let col of columns" [value]="col">Filter by {{ col }}</option>
        </select>
        <input [(ngModel)]="filterValue" (input)="applyFilter()" [ngModelOptions]="{ standalone: true }" placeholder="Enter filter value" />
        <select [(ngModel)]="groupByColumn" (change)="adkTable.setGroupBy(groupByColumn)">
            <option value="">No Grouping</option>
            <option>option *ngFor="let col of columns" [value]="col">Group by {{ col }}</option>
        </select>
        <table>
            <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            [checked]="adkTable.selectedRowsData().length === adkTable.visibleData().length"
                            (change)="adkTable.toggleAllRowsSelection()"
                        />
                    </th>
                    <th
                        *ngFor="let col of columns; let i = index"
                        (click)="adkTable.sortBy(col)"
                        draggable="true"
                        (dragstart)="adkTable.dragStart(i)"
                        (dragover)="$event.preventDefault()"
                        (drop)="onDragDrop(i)"
                    >
                        {{ col }}
                        <span *ngIf="adkTable.sortCriteriaData().key === col">
                            {{ adkTable.sortCriteriaData().direction === 'ascending' ? '▲' : '▼' }}
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <ng-container *ngIf="groupByColumn; else flatView">
                    <ng-container *ngFor="let group of adkTable.groupedData() | keyvalue">
                        <tr (click)="toggleGroup(group.key)" class="group-header">
                            <td [attr.colspan]="columns.length + 1">
                                {{ group.key }} ({{ group.value.length }} items)
                                <span>{{ expandedGroups[group.key] ? '▼' : '▶' }}</span>
                            </td>
                        </tr>
                        <ng-container *ngIf="expandedGroups[group.key]">
                            <tr *ngFor="let row of group.value">
                                <td>
                                    <input
                                        type="checkbox"
                                        [checked]="adkTable.selectedRowsData().includes(row)"
                                        (change)="adkTable.toggleRowSelection(row)"
                                    />
                                </td>
                                <td *ngFor="let col of columns">{{ row[col] }}</td>
                            </tr>
                        </ng-container>
                    </ng-container>
                </ng-container>
                <ng-template #flatView>
                    <tr *ngFor="let row of adkTable.currentPageData()">
                        <td>
                            <input type="checkbox" [checked]="adkTable.selected(row)" (change)="adkTable.toggleRowSelection(row)" />
                        </td>
                        <td *ngFor="let col of columns">{{ row[col] }}</td>
                    </tr>
                </ng-template>
            </tbody>
        </table>
        <div>
            <button
                (click)="adkTable.setPage(adkTable.paginationCriteria().currentPage - 1)"
                [disabled]="adkTable.paginationCriteria().currentPage === 1"
            >
                Previous
            </button>
            <span>Page {{ adkTable.paginationCriteria().currentPage }} of {{ adkTable.paginationCriteria().totalPages }}</span>
            <button
                (click)="adkTable.setPage(adkTable.paginationCriteria().currentPage + 1)"
                [disabled]="adkTable.paginationCriteria().currentPage === adkTable.paginationCriteria().totalPages"
            >
                Next
            </button>
            <select [(ngModel)]="itemsPerPage" (change)="adkTable.setItemsPerPage(itemsPerPage)">
                <option [value]="5">5</option>
                <option [value]="10">10</option>
                <option [value]="25">25</option>
            </select>
            <span>Items per page</span>
        </div>
        <div>
            <p>Selected rows: {{ adkTable.selectedRowsData().length }}</p>
        </div>
    `,
    styles: [
        `
            .group-header {
                cursor: pointer;
                background-color: #f0f0f0;
            }
            .group-header:hover {
                background-color: #e0e0e0;
            }
        `,
    ],
})
export class DummyTableComponent implements OnInit {
    adkTable = inject(AdkTable, { self: true });
    @Input() set data(value: any[]) {
        this.adkTable.initialData = value;
    }
    @Input() columns: string[] = [];

    groupByColumn: string = '';
    expandedGroups: { [key: string]: boolean } = {};
    itemsPerPage: number = 10;

    filterColumn: string = '';
    filterValue: string = '';

    ngOnInit(): void {
        if (this.columns.length > 0) {
            this.filterColumn = this.columns[0];
        }
    }

    onFilterColumnChange(column: string) {
        this.filterColumn = column;
        this.applyFilter();
    }

    applyFilter() {
        this.adkTable.applyFilter({ column: this.filterColumn, value: this.filterValue });
    }

    toggleGroup(key: string) {
        this.expandedGroups[key] = !this.expandedGroups[key];
    }

    onItemsPerPageChange() {
        this.adkTable.setItemsPerPage(this.itemsPerPage);
    }

    onDragDrop(index: number) {
        this.adkTable.dragDrop(index);
        this.columns = this.adkTable.headers();
    }
}

const meta: Meta<DummyTableComponent> = {
    title: 'TailwindUI/Components/Directives/AdkTable',
    component: DummyTableComponent,
    decorators: [
        moduleMetadata({
            imports: [DummyTableComponent],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DummyTableComponent>;

const sampleData = [
    { uid: 1, name: 'John Doe', age: 30, department: 'IT' },
    { uid: 2, name: 'Jane Smith', age: 25, department: 'HR' },
    { uid: 3, name: 'Bob Johnson', age: 35, department: 'IT' },
    { uid: 4, name: 'Alice Brown', age: 28, department: 'Finance' },
    { uid: 5, name: 'Charlie Davis', age: 42, department: 'HR' },
    { uid: 6, name: 'Eva Wilson', age: 33, department: 'Finance' },
    { uid: 7, name: 'Frank Miller', age: 39, department: 'IT' },
];

export const Default: Story = {
    args: {
        data: sampleData,
        columns: ['uid', 'name', 'age', 'department'],
    },
};

export const WithFiltering: Story = {
    args: {
        data: sampleData,
        columns: ['uid', 'name', 'age', 'department'],
    },
};

export const WithSorting: Story = {
    args: {
        data: sampleData,
        columns: ['uid', 'name', 'age', 'department'],
    },
    play: async ({ canvasElement }) => {
        const canvas = canvasElement.querySelector('app-dummy-table');
        if (canvas) {
            const ageHeader = canvas.querySelector('th:nth-child(3)');
            if (ageHeader) {
                // @ts-ignore
                ageHeader.click();
            }
        }
    },
};

export const WithPagination: Story = {
    args: {
        data: Array(50)
            .fill(null)
            .map((_, i) => ({
                id: i + 1,
                name: `Person ${i + 1}`,
                age: 20 + (i % 30),
                department: ['IT', 'HR', 'Finance'][i % 3],
            })),
        columns: ['uid', 'name', 'age', 'department'],
    },
};

export const WithSelection: Story = {
    args: {
        data: sampleData,
        columns: ['uid', 'name', 'age', 'department'],
    },
    play: async ({ canvasElement }) => {
        const canvas = canvasElement.querySelector('app-dummy-table');
        if (canvas) {
            const checkboxes = canvas.querySelectorAll('input[type="checkbox"]');
            if (checkboxes.length > 1) {
                (checkboxes[1] as HTMLInputElement).click();
                (checkboxes[2] as HTMLInputElement).click();
            }
        }
    },
};

export const GroupedByDepartment: Story = {
    args: {
        data: sampleData,
        columns: ['uid', 'name', 'age', 'department'],
    },
    play: async ({ canvasElement }) => {
        const canvas = canvasElement.querySelector('app-dummy-table');
        if (canvas) {
            const select = canvas.querySelector('select');
            if (select) {
                select.value = 'department';
                select.dispatchEvent(new Event('change'));
            }
        }
    },
};

export const WithDragAndDrop: Story = {
    args: {
        data: sampleData,
        columns: ['uid', 'name', 'age', 'department'],
    },
    play: async ({ canvasElement }) => {
        const canvas = canvasElement.querySelector('app-dummy-table');
        if (canvas) {
            const headers = canvas.querySelectorAll('th');
            if (headers.length > 2) {
                const dragEvent = new DragEvent('dragstart', {
                    bubbles: true,
                    cancelable: true,
                });
                headers[1].dispatchEvent(dragEvent);

                const dropEvent = new DragEvent('drop', {
                    bubbles: true,
                    cancelable: true,
                });
                headers[3].dispatchEvent(dropEvent);
            }
        }
    },
};

export const EmptyTable: Story = {
    args: {
        data: [],
        columns: ['uid', 'name', 'age', 'department'],
    },
};
