import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ModalTemplateComponent } from '../modal-template/modal-template.component';
import { ModalTemplateHelper } from '../../helpers/modal-template.helper';
import { ModalTemplateModel } from '../modal-template/modal-template.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lyn-modal-button',
  templateUrl: './modal-button.component.html',
})
export class ModalButtonComponent implements OnChanges {
  /**
   * modalOptions for dialog display
   */
  @Input() public modalOptions: ModalTemplateModel<any> = new ModalTemplateHelper({});
  /**
   * confirmedValues outputs filter value to parent
   */
  @Output() public confirmedValues: EventEmitter<any> = new EventEmitter<any>();
  /**
   * dialogRef for dialog pop up
   */
  public dialogRef!: MatDialogRef<ModalTemplateComponent>;

  constructor(public dialog: MatDialog) {}
  public ngOnChanges({ modalOptions }: SimpleChanges): void {
    if (modalOptions?.currentValue) this.modalOptions = modalOptions.currentValue;
  }
  /**
   * Opens dialog
   */
  public openDialog(): Subscription {
    this.dialogRef = this.dialog.open(ModalTemplateComponent, {
      data: {
        title: this.modalOptions.modalTitle,
        body: this.modalOptions.bodyText,
        close: this.modalOptions.closeBtn,
        info: this.modalOptions.info,
        cancelBtnText: this.modalOptions.cancelBtnText,
        value: this.modalOptions.value,
        btnControl: this.modalOptions.btnControl,
      },
      panelClass: 'modal-template-container',
    });
    return this.dialogRef.afterClosed().subscribe({
      next: (result) => {
        this.confirmedValues.emit(result);
      },
    });
  }
}
