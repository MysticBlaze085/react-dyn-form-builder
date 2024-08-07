import { Component, ViewChild } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

import { AdkSelection } from '../selection';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-table-example',
    template: `
        <div adk-selection #selection="adkSelection">
            <table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" (change)="toggleSelectAll($event)" />
                        </th>
                        <th>Item</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let item of items">
                        <td>
                            <input type="checkbox" [checked]="selection.selected(item)" (change)="toggleSelectItem(item)" />
                        </td>
                        <td>{{ item }}</td>
                    </tr>
                </tbody>
            </table>
            <p>Selected items: {{ selection.count() }}</p>
        </div>
    `,
    standalone: true,
    imports: [CommonModule, AdkSelection],
})
export class TableExampleComponent {
    @ViewChild('selection', { static: true }) selection: any;
    items = ['item1', 'item2', 'item3', 'item4'];

    toggleSelectAll(event: Event): void {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            this.items.forEach((item) => this.selection.select(item));
        } else {
            this.selection.clear();
        }
    }

    toggleSelectItem(item: string): void {
        if (this.selection.selected(item)) {
            this.selection.deselect(item);
        } else {
            this.selection.select(item);
        }
    }
}

const meta: Meta<TableExampleComponent> = {
    component: TableExampleComponent,
    title: '(TW) Angular UI / Directives / Selection',
};
export default meta;
type Story = StoryObj<TableExampleComponent>;

export const Primary: Story = {
    args: {},
};
