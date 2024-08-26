import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Field, FieldsComponent } from '../../../../tw-form-ui';
import { FilterCriteria, PreferenceCriteria } from '../models';

import { AdkFormGroup } from '../../../../directives';
import { AdkTable } from '../directives/table';
import { ButtonComponent } from '../../button.component';
import { ImperativeObservable } from 'projects/ng-lib/src/lib/utils';
import { ReactiveFormsModule } from '@angular/forms';
import { TwTypographyComponent } from '../../typography.component';
import { searchColumnSelector } from '../utils';

@Component({
    selector: 'tw-table-header',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, AsyncPipe, TwTypographyComponent, ButtonComponent, FieldsComponent, AdkTable],
    hostDirectives: [AdkFormGroup],
    template: ` <div class="relative bg-clip-border mt-4 mx-4 bg-white text-gray-700 rounded-none overflow-visible">
        <div class="mb-2 flex items-center justify-between gap-8">
            <div>
                @if(title){
                <tw-typography
                    variant="h5"
                    color="blue-gray"
                    classStyle="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
                    >{{ title }}</tw-typography
                >
                } @if(subtitle){
                <tw-typography color="gray" classStyle="mt-1 font-normal">{{ subtitle }}</tw-typography>
                }
            </div>
            <div class="flex shrink-0 flex-col gap-2 sm:flex-row">
                @if(buttons && buttons.length > 0){ @for(button of buttons; track $index){
                <div class="flex items-center gap-3 cursor-pointer" (click)="button.onClick()">
                    <adk-button [color]="button.color" (click)="button.onClick()">
                        <span class="flex items-center gap-2">
                            @if(button.icon){
                            <span class="material-symbols-outlined">{{ button.icon }}</span> }{{ button.label }}</span
                        >
                    </adk-button>
                </div>
                } }
                <div class="flex items-center gap-3 cursor-pointer">
                    <!-- <tw-table-settings-dialog (triggerUpdate)="handlePreferences()"></tw-table-settings-dialog> -->
                </div>
            </div>
        </div>

        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
            <!-- @if(tabs?.length){ -->
            <!-- <Tabs value="{tabs.length">
                0 ? tabs[0].value : ''} class="w-full md:w-max">
                <TabsHeader>
                    {tabs.map(({ label, value }) => (
                    <Tab key="{value}" value="{value}"> &nbsp;&nbsp;{label}&nbsp;&nbsp; </Tab>
                    ))}
                </TabsHeader>
            </Tabs> -->
            <!-- } -->
        </div>
        @if((searchColumn.change$ | async) && isSearchable){
        <form *ngIf="field.change$ | async as field" [formGroup]="formGroup" class="flex flex-row gap-2 w-full flex-wrap z-[20000]">
            <adk-fields [fieldConfig]="[field]"></adk-fields>
        </form>
        }
    </div>`,
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
            .material-symbols-outlined {
                font-size: 16px !important;
            }
        `,
    ],
})
export class TableHeaderComponent implements OnInit, AfterViewInit {
    #formGroup = inject(AdkFormGroup, { self: true });
    // adkTable = inject(AdkTable);

    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() isSearchable = false;
    @Input() searchColumnValue?: string;
    @Input() visibleColumns: string[] = [];
    @Input() buttons: {
        label: string;
        onClick: () => void;
        color: 'primary' | 'secondary' | 'success' | 'warn' | 'danger';
        icon: string;
    }[] = [];
    @Output() preferenceCriteria = new EventEmitter<PreferenceCriteria>();
    @Output() filterCriteria = new EventEmitter<FilterCriteria>();

    searchColumn = new ImperativeObservable<string | null>('');
    field = new ImperativeObservable<Field | undefined>(undefined);
    isFirstChange = true;

    get formGroup() {
        return this.#formGroup.formGroup();
    }

    ngAfterViewInit(): void {
        console.log('ngAfterViewInit', this.searchColumn.value);
        this.searchColumn.value = this.visibleColumns[0];
        this.searchColumn.change$.subscribe((e: any) => {
            this.#formGroup.reset();
            this.field.value = this.setField(e);
            this.#formGroup.setFormGroup([this.field.value]);
            this.formGroup.valueChanges.subscribe((e) => {
                this.handleFiltering(e);
            });
            // if (!this.isFirstChange) {
            // this.actionKeyPress.emit(true);
            // }
        });
    }
    ngOnInit(): void {
        // this.tdss.initialFilterSearch();
        // this.adkTable.applyFilter({ column: this.adkTable.headers()[0], value: this.searchColumnValue ?? '' });
        this.filterCriteria.emit({ column: this.visibleColumns[0], value: this.searchColumnValue ?? '' });
    }

    handlePreferences(event: any): void {
        console.log('handlePreferences', event);
        // this.searchColumn.value = this.visibleColumns[0];

        // this.actionKeyPress.emit(true);
    }

    handleFiltering({ searchColumn }: any): void {
        console.log('handleFiltering', searchColumn);
        // this.adkTable.applyFilter({ column: this.searchColumn.value ?? '', value: searchColumn });
        // this.actionKeyPress.emit(true);
    }

    setField(column: string | undefined): Field {
        this.resetField();
        setTimeout(() => {
            console.info('Timed column value update');
        }, 1000);
        return searchColumnSelector(column ?? '');
    }

    private resetField(): void {
        this.field.value = undefined;
    }
}
