import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Field, RowData } from '../../../../tw-form-ui';

import { AdkExpansionPanelComponent } from '../../expansion-panel.component';
import { AdkSelection } from '../../../../directives';
import { AdkTable } from '../directives/table';
import { AdkTooltipDirective } from '../../../../directives/tooltip';
import { CheckboxComponent } from 'projects/ng-lib/src/public-api';
import { FieldComponent } from '../../../../tw-form-ui/components/field.component';
import { ImperativeObservable } from '../../../../utils';
import { SortableIconComponent } from '../utils';
import { TwTypographyComponent } from '../../typography.component';

@Component({
    selector: 'tw-table',
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
        AdkTable,
    ],
    hostDirectives: [AdkTable],
    templateUrl: './table.component.html',
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `,
    ],
})
export class TableComponent {
    adkTable = inject(AdkTable);
    @Input() set data(value: RowData[]) {
        this.adkTable.initialData = value;
    }
    @Input() columns: string[] = [];
    @Input() isDraggable = false;
    @Input() isSelectable = false;
    @Input() isSortable = false;

    rowFocus = new ImperativeObservable<RowData | null>(null);

    isSelected(row: RowData): boolean {
        const rowStr = JSON.stringify(row);
        return this.adkTable.selectedRowsData().includes(rowStr);
    }

    isRowFocused(row: RowData): boolean {
        const selectedRowStr = JSON.stringify(this.rowFocus.value);
        const rowStr = JSON.stringify(row);
        return selectedRowStr === rowStr;
    }

    isCellValArray(value: string | []) {
        return Array.isArray(value);
    }

    isCellFieldObject(value: Field | any) {
        if (typeof value === 'object') return true;
        return false;
    }

    onDragDrop(index: number) {
        this.adkTable.dragDrop(index);
        this.columns = this.adkTable.headers();
    }
}
