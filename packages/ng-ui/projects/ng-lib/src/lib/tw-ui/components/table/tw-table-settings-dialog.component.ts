import { AdkFormGroup, FieldsComponent } from '../../../tw-form-ui';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { preferenceColumnSelector, preferenceGroupBySelector, preferenceVisibilitySelector } from './fields.controls';

import { AdkTablePreferences } from './directives/preferences';
import { ButtonComponent } from '../button.component';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { FieldComponent } from '../../../tw-form-ui/components/field.component';
import { IconButtonComponent } from './utils/icon-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingCriteria } from './models/table.interface';
import { SettingsIconComponent } from './utils/settings-icon.component';
import { TwCardComponent } from '../card/tw-card.component';
import { TwTypographyComponent } from '../typography.component';

@Component({
  selector: 'tw-table-settings-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsIconComponent,
    TwCardComponent,
    TwTypographyComponent,
    IconButtonComponent,
    DialogComponent,
    ButtonComponent,
    FieldsComponent,
    FieldComponent,
    AdkTablePreferences,
  ],
  hostDirectives: [AdkFormGroup],
  template: `
    <adk-settings-icon (click)="openDialog()"> </adk-settings-icon>
    <tw-dialog [isOpen]="isDialogOpen" (close)="closeDialog()" class="bg-transparent shadow-none">
      <tw-card [isHeaderWrapped]="true" [isFooterWrapped]="true">
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
        <div class="adk-card-body">
          <form [formGroup]="formGroup">
            @if (visibleColumnField) {
            <tw-typography class="adk-card-subtitle mb-3 font-normal" variant="paragraph" color="gray">
              Customize the columns visibility.
            </tw-typography>
            <adk-fields [fieldConfig]="[visibleColumnField]" [wrapperClass]="'flex flex-col gap-4'"></adk-fields>
            } @if (columnField) {
            <tw-typography class="mt-4 font-normal" variant="paragraph" color="gray">
              Select the column to filter a search value
            </tw-typography>
            <adk-fields class="mt-4" [fieldConfig]="[columnField]" [wrapperClass]="'flex flex-col gap-4'"></adk-fields>
            } @if (groupByField) {
            <adk-fields class="mt-4" [fieldConfig]="[groupByField]" [wrapperClass]="'flex flex-col gap-4'"></adk-fields>
            }
          </form>
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
export class TwTableSettingsDialogComponent implements OnInit, AfterViewInit {
  @Input() headers: string[] = [];
  @Output() settingsCriteria = new EventEmitter<SettingCriteria>();
  #formGroup: AdkFormGroup<any> = inject(AdkFormGroup, { self: true }) as AdkFormGroup<any>;
  isDialogOpen = false;
  visibleColumnField = preferenceVisibilitySelector(this.headers);
  columnField = preferenceColumnSelector(this.headers);
  groupByField = preferenceGroupBySelector(this.headers);

  get formGroup() {
    return this.#formGroup.formGroup();
  }

  ngAfterViewInit(): void {
    this.#formGroup.setFormGroup([this.visibleColumnField, this.columnField, this.groupByField]);
    let previousValue = this.formGroup.value;
    const headers = this.headers;
    this.formGroup.valueChanges.subscribe((currentValue: { [x: string]: any }) => {
      const selectedVisibleColumns: string[] = [];
      const action = {
        visibleColumns: selectedVisibleColumns,
        groupByColumn: currentValue['groupByColumn'],
        column: currentValue['column'],
      };
      // Check if any relevant value has changed
      let hasChanged = false;
      if (previousValue['groupByColumn'] !== currentValue['groupByColumn']) {
        hasChanged = true;
      }
      if (previousValue['column'] !== currentValue['column']) {
        hasChanged = true;
      }
      headers.forEach((element) => {
        if (previousValue[element] !== currentValue[element]) {
          hasChanged = true;
        }
      });
      if (!hasChanged) {
        return;
      }
      // Update previous value
      previousValue = { ...currentValue };
      // Process the changes
      headers.forEach((element) => {
        if (currentValue[element]) selectedVisibleColumns.push(element);
      });
      action.visibleColumns = selectedVisibleColumns;
      action.groupByColumn = currentValue['groupByColumn'] === 'none' ? '' : currentValue['groupByColumn'];
      action.column = currentValue['column'];
      this.emitSettingsCriteria(action);
    });
  }

  emitSettingsCriteria(criteria: SettingCriteria) {
    this.settingsCriteria.emit(criteria);
  }

  ngOnInit(): void {
    this.visibleColumnField = preferenceVisibilitySelector(this.headers);
    this.columnField = preferenceColumnSelector(this.headers);
    this.groupByField = preferenceGroupBySelector(this.headers);
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  getUpdatedPreferences(): string[] {
    return ['column1', 'column2'];
  }

  getUpdatedGroupBy(): string {
    return 'column1';
  }
}
