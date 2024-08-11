import { Component, OnInit, inject } from '@angular/core';
import { SettingsIconComponent, preferenceColumnSelector, preferenceGroupBySelector, preferenceVisibilitySelector } from './utils';

import { ButtonComponent } from '../button.component';
import { CheckboxComponent } from '../../../tw-form-ui/components/types/checkbox.component';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { IconButtonComponent } from './utils/icon-button.component';
import { TableDataSourceService } from './table-datasource.service';
import { TwCardComponent } from '../card/tw-card.component';
import { TwTypographyComponent } from '../typography.component';

@Component({
    selector: 'tw-table-settings-dialog',
    standalone: true,
    imports: [
        CommonModule,
        SettingsIconComponent,
        TwCardComponent,
        TwTypographyComponent,
        IconButtonComponent,
        DialogComponent,
        ButtonComponent,
        CheckboxComponent,
    ],
    template: `
        <adk-settings-icon (click)="openDialog()"> </adk-settings-icon>
        <tw-dialog [isOpen]="isDialogOpen" (close)="closeDialog()" class="bg-transparent shadow-none">
            <tw-card>
                <tw-typography
                    variant="h3"
                    color="blue-gray"
                    class="adk-card-header"
                    classStyle="antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900 flex flex-row"
                >
                    Column Preferences
                    <div class="grow"></div>
                    <adk-icon-button (click)="closeDialog()"></adk-icon-button>
                </tw-typography>
                <tw-typography class="adk-card-subtitle mb-3 font-normal" variant="paragraph" color="gray">
                    Customize the columns visibility.
                </tw-typography>
                <div class="adk-card-body">
                    @if (visibleColumnField) {
                    <adk-checkbox [field]="visibleColumnField"></adk-checkbox>
                    <!-- <adk-field [field]="visibleColumnField"></adk-field> -->
                    }
                    <tw-typography class="mb-3 font-normal" variant="paragraph" color="gray">
                        Select the column to filter a search value
                    </tw-typography>
                    @if (columnField) {
                    <!-- <adk-field [field]="columnField"></adk-field> -->
                    } @if (groupByField) {
                    <!-- <adk-field [field]="groupByField"></adk-field> -->
                    }
                </div>
                <div class="adk-card-footer">
                    <adk-button
                        class="w-full"
                        (click)="closeDialog()"
                        customClasses="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
                    >
                        Close Preferences
                    </adk-button>
                </div>
            </tw-card>
        </tw-dialog>
    `,
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `,
    ],
})
export class TwTableSettingsDialogComponent implements OnInit {
    isDialogOpen = false;
    tdss = inject(TableDataSourceService);
    visibleColumnField = preferenceVisibilitySelector(this.tdss.get('headers'));
    columnField = preferenceColumnSelector(this.tdss.get('headers'));
    groupByField = preferenceGroupBySelector(this.tdss.get('headers'));

    ngOnInit(): void {
        this.visibleColumnField = preferenceVisibilitySelector(this.tdss.get('headers'));
        this.columnField = preferenceColumnSelector(this.tdss.get('headers'));
        this.groupByField = preferenceGroupBySelector(this.tdss.get('headers'));
    }

    openDialog() {
        this.isDialogOpen = true;
    }

    closeDialog() {
        // Optionally save dialog preferences using the service
        // const updatedPreferences = this.getUpdatedPreferences();
        // const updatedGroupBy = this.getUpdatedGroupBy();

        // this.tdss.setGroupBy(updatedGroupBy);
        // // Assume setPreferences is a method you'd implement in the service
        // this.tdss.updatePreferences(updatedPreferences);

        this.isDialogOpen = false;
    }

    getUpdatedPreferences(): string[] {
        // Implement logic to get updated preferences from the dialog
        return ['column1', 'column2']; // Example return value
    }

    getUpdatedGroupBy(): string {
        // Implement logic to get updated group by from the dialog
        return 'column1'; // Example return value
    }
}
