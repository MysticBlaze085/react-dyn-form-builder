import type { Meta, StoryObj } from '@storybook/angular';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Item {
    name: string;
    age: number;
}

@Component({
    selector: 'app-sortable-table-example',
    template: `
        <table>
            <thead>
                <tr>
                    <th (click)="sort('name')">Name</th>
                    <th (click)="sort('age')">Age</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let item of sortedItems">
                    <td>{{ item.name }}</td>
                    <td>{{ item.age }}</td>
                </tr>
            </tbody>
        </table>
    `,
    standalone: true,
    imports: [CommonModule],
})
export class SortableTableExampleComponent {
    items: Item[] = [
        { name: 'John Doe', age: 28 },
        { name: 'Jane Smith', age: 34 },
        { name: 'Sam Green', age: 22 },
        { name: 'Emily Brown', age: 42 },
    ];

    sortedItems: Item[] = [...this.items];
    currentSortKey: keyof Item = 'name';
    currentSortDirection: 'asc' | 'desc' = 'asc';

    sort(key: keyof Item): void {
        if (this.currentSortKey === key) {
            this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.currentSortDirection = 'asc';
        }
        this.currentSortKey = key;
        this.sortedItems.sort((a, b) => {
            if (a[key] < b[key]) return this.currentSortDirection === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return this.currentSortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }
}

const meta: Meta<SortableTableExampleComponent> = {
    component: SortableTableExampleComponent,
    title: '(TW) Angular UI / Directives / Sortable Table',
};
export default meta;
type Story = StoryObj<SortableTableExampleComponent>;

export const Primary: Story = {
    args: {},
};
