/* eslint-disable @typescript-eslint/no-empty-function */

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ModalButtonComponent } from './modal-button.component';
import { ModalTemplateComponent } from '../modal-template/modal-template.component';
import { SimpleChange } from '@angular/core';
import { of } from 'rxjs';

class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(),
    };
  }
  close() {
    return {
      afterClosed: () => of(),
    };
  }
  afterClosed() {
    return of('Modal Close Complete');
  }
}

describe('ModalButtonComponent', () => {
  let component: ModalButtonComponent;
  const dialogRef: MatDialog = new MatDialogMock() as any;

  beforeEach(() => {
    component = new ModalButtonComponent(dialogRef);
    component.dialogRef = component.dialog.open(ModalTemplateComponent, {
      data: {
        title: component.modalOptions.modalTitle,
        body: component.modalOptions.bodyText,
        close: component.modalOptions.closeBtn,
        info: component.modalOptions.info,
        cancelBtnText: component.modalOptions.cancelBtnText,
        value: component.modalOptions.value,
        btnControl: component.modalOptions.btnControl,
      },
      panelClass: 'modal-template-container',
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should set values', () => {
      const simpleChanges = {
        modalOptions: new SimpleChange(
          undefined,
          {
            closeBtn: false,
            btnColor: 'primary',
            btnText: 'New Funky Text',
            modalTitle: "<h2>Do <em class='warn'>The Thing</em></h2>",
            bodyText: "<h3>Are you sure you want to do <em class='warn'>The Thing</em></h3>",
          },
          true
        ),
      };
      component.ngOnChanges(simpleChanges);
      expect(component.modalOptions).toEqual({
        closeBtn: false,
        btnColor: 'primary',
        btnText: 'New Funky Text',
        modalTitle: "<h2>Do <em class='warn'>The Thing</em></h2>",
        bodyText: "<h3>Are you sure you want to do <em class='warn'>The Thing</em></h3>",
      });
    });
  });

  describe('openDialog', () => {
    it('should call openDialog happy path', () => {
      spyOn(component.confirmedValues, 'emit');
      spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () => of('Modal Close Complete'),
      } as MatDialogRef<typeof component>);
      component.openDialog();
      component.dialogRef.afterClosed().subscribe({
        next: (result) => {
          expect(result).toEqual('Modal Close Complete');
          expect(component.confirmedValues.emit).toHaveBeenCalled();
        },
        complete: () => {},
      });
    });
  });
});
