import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RowData } from './models';
import { TwCardComponent } from '../card/tw-card.component';
import { TwDefaultTableComponent } from './tw-table.component';
import { TwTableCardHeaderComponent } from './tw-table-card-header.component';
import { TwTableFooterComponent } from './tw-table-footer.component';

@Component({
  selector: 'tw-table-card',
  standalone: true,
  imports: [CommonModule, TwCardComponent, TwDefaultTableComponent, TwTableCardHeaderComponent, TwTableFooterComponent],
  template: `
    <tw-card>
      <div class="adk-card-header">
        <tw-table-card-header
          [title]="title"
          [subtitle]="subtitle"
          [buttons]="buttons"
          (actionKeyPress)="actionButtonTriggered()"
        ></tw-table-card-header>
      </div>
      <div class="adk-card-body">
        <tw-default-table
          [headers]="headers"
          [rows]="rows"
          [isSelectable]="isSelectable"
          [isSortable]="isSortable"
          [isDraggable]="isDraggable"
          [groupBy]="groupBy"
          [actionColName]="actionColName"
          [actionButton]="actionButton"
          [isPaginationAction]="paginationAction"
        ></tw-default-table>
      </div>
      @if (rows.length > 5) {
      <div class="adk-card-footer">
        <tw-table-footer (actionButtonClicked)="actionButtonTriggered()"></tw-table-footer>
      </div>
      }
    </tw-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class TwTableCardComponent {
  @Input() isSelectable = false;
  @Input() isSortable = false;
  @Input() isDraggable = false;
  @Input() headers: string[] = [];
  @Input() actionColName?: string;
  @Input() actionButton?: TemplateRef<any> | string;
  @Input() rows: RowData[] = [];
  @Input() groupBy = '';
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() buttons: { label: string; onClick: () => void; color: 'primary' | 'secondary' | 'success' | 'warn' | 'danger'; icon: string }[] =
    [];

  paginationAction = false;

  actionButtonTriggered() {
    this.paginationAction = !this.paginationAction;
  }
}
