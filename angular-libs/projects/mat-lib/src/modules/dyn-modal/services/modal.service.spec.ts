/* eslint-disable @typescript-eslint/no-empty-function */

import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Modal } from '../helpers';
import { ModalService } from './modal.service';
import { TestBed } from '@angular/core/testing';
import { TestComponent } from 'src/testing/jasmine.mock';
import { of } from 'rxjs';

describe('ModalService', () => {
  const model = {
    ActionButton: 'Delete',
    SupportingText: 'Are you sure?',
  };
  let dialog: MatDialog;
  let service: ModalService;
  const dialogRefSpyObj = jasmine.createSpyObj({ closeAll: () => {}, afterClosed: of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [ModalService, { provide: MAT_DIALOG_DATA, useValue: model }],
    });
    service = TestBed.inject(ModalService);
    dialog = TestBed.inject(MatDialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call createModal', () => {
    spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);
    const modal = new Modal(TestComponent);
    service.createModal(modal);
    dialog.closeAll();

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should call openModal', () => {
    spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);
    let result;
    const modal = new Modal(TestComponent);
    service.openModal(modal);
    dialogRefSpyObj.afterClosed().subscribe((res: any) => (result = res));
    dialog.closeAll();

    expect(dialog.open).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});
