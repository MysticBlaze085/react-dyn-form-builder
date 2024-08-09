import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';

import { ButtonComponent } from '../button.component';
import { CommonModule } from '@angular/common';
import { FieldBuilder } from '../../../tw-form-ui';
import { FieldComponent } from '../../../tw-form-ui/components/field.component';
import { ImperativeObservable } from '../../../utils';
import { TableDataSourceService } from './table-datasource.service';
import { TwTableSettingsDialogComponent } from './tw-table-settings-dialog.component';
import { TwTypographyComponent } from '../typography.component';
import { searchColumnSelector } from './utils';

@Component({
    selector: 'tw-table-card-header',
    standalone: true,
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
                @if(buttons && buttons.length > 0){
                <div *ngFor="let button of buttons" class="flex items-center gap-3 cursor-pointer" (click)="button.onClick()">
                    <adk-button color="{{ button.color }}" (click)="button.onClick()">
                        @if(button.icon){
                        <span class="material-symbols-outlined">{{ button.icon }}</span>
                        }
                        {{ button.label }}
                    </adk-button>
                </div>
                }
                <div class="flex items-center gap-3 cursor-pointer">
                    <tw-table-settings-dialog></tw-table-settings-dialog>
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
        @if(searchColumn && field){
        <div class="flex flex-row gap-2 w-full flex-wrap z-[20000]">
            <adk-field [field]="field" (fieldValueChange)="handleFiltering($event)"></adk-field>
        </div>
        }
    </div>`,
    imports: [CommonModule, TwTypographyComponent, ButtonComponent, FieldComponent, TwTableSettingsDialogComponent],
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
export class TwTableCardHeaderComponent implements OnInit, AfterViewInit {
    tdss = inject(TableDataSourceService);
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() buttons: { label: string; onClick: () => void; color: string; icon: string }[] = [];
    @Output() actionKeyPress = new EventEmitter<boolean>();

    searchColumn = new ImperativeObservable<string | null>(this.tdss.get('filterDataSource').column);
    field?: FieldBuilder;

    ngAfterViewInit(): void {
        this.searchColumn.value = this.tdss.get('filterDataSource').column;
        this.field = searchColumnSelector(this.searchColumn.value ?? '');
    }

    ngOnInit(): void {
        this.tdss.initialFilterSearch();
    }

    handleFiltering(e: any): void {
        this.tdss.setFilter({ column: this.searchColumn.value, value: e });
        this.actionKeyPress.emit(true);
    }
}
