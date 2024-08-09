import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';

import { ButtonComponent } from '../button.component';
import { CommonModule } from '@angular/common';
import { ImperativeObservable } from '../../../utils';
import { SelectComponent } from '../../../tw-form-ui/components/types/select.component';
import { TableDataSourceService } from './table-datasource.service';
import { TwTypographyComponent } from '../typography.component';
import { paginationSelector } from './utils';

@Component({
    selector: 'tw-table-footer',
    standalone: true,
    template: `
        <div class="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <tw-typography variant="small" color="blue-gray" class="w-full" classStyle="flex flex-row font-normal">
                <span class="flex flex-col justify-center mr-2" style="white-space: 'nowrap'">
                    Page {{ currentPage.change$ | async }} of {{ totalPages.change$ | async }}
                </span>
                <adk-select [field]="field" (fieldValueChange)="handlePageSizeChange($event)"></adk-select>
            </tw-typography>
            @if((totalPages.change$ | async) > 1){
            <div class="flex gap-2">
                <adk-button size="sm" color="blue" disabled="{{ (currentPage.change$ | async) <= 1 }}" (click)="handlePreviousClick()">
                    Previous
                </adk-button>
                <adk-button
                    size="sm"
                    color="blue"
                    disabled="{{ (currentPage.change$ | async) >= (totalPages.change$ | async) }}"
                    (click)="handleNextClick()"
                >
                    Next
                </adk-button>
            </div>
            }
        </div>
    `,
    imports: [CommonModule, TwTypographyComponent, ButtonComponent, SelectComponent],
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `,
    ],
})
export class TwTableFooterComponent implements OnInit {
    tdss = inject(TableDataSourceService);
    @Output() actionButtonClicked = new EventEmitter<boolean>();
    currentPage = new ImperativeObservable<number>(this.tdss.get('pagination')['currentPage']);
    totalPages = new ImperativeObservable<number>(this.tdss.get('pagination')['totalPages']);

    field = paginationSelector;

    ngOnInit(): void {
        this.handleInitialPagination();
    }

    handleInitialPagination(): void {
        this.tdss.setPaginationState({ currentPage: 1, pageSize: 5 });
        this.updateValues();
        this.actionButtonClicked.emit();
    }

    handlePageSizeChange(e: any): void {
        console.log('handlePageSizeChange', e);
        //check if e is string if is turn to number
        const pageSize = typeof e === 'string' ? parseInt(e, 10) : e;
        this.tdss.setPaginationState({ currentPage: 1, pageSize });
        this.updateValues();

        this.actionButtonClicked.emit(true);
    }

    handleNextClick(): void {
        this.tdss.setPaginationState({ currentPage: this.currentPage.value + 1 });
        this.updateValues();

        this.actionButtonClicked.emit(true);
    }

    handlePreviousClick(): void {
        this.tdss.setPaginationState({ currentPage: this.currentPage.value - 1 });
        this.updateValues();

        this.actionButtonClicked.emit(true);
    }

    private updateValues() {
        this.currentPage.value = this.tdss.get('pagination')['currentPage'];
        this.totalPages.value = this.tdss.get('pagination')['totalPages'];
    }
}
