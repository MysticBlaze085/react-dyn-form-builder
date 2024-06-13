/* eslint-disable @typescript-eslint/no-empty-function */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockCertFile, MockModalService, MockTlsFileUploadService, TestComponent } from 'src/testing/jasmine.mock';
import { ReactiveFormsModule, Validators } from '@angular/forms';

import { FileInputControl } from '../../helpers/file-upload.helper';
import { FileInputControlComponent } from './file-input-control.component';
import { Modal } from '@core/shared/modules/dyn-modal/helpers';
import { ModalService } from '@core/shared/modules/dyn-modal/services';
import { SimpleChange } from '@angular/core';
import { TlsFileUploadService } from '../../services';
import { of } from 'rxjs';

describe('FileInputControlComponent', () => {
  let component: FileInputControlComponent;
  let fixture: ComponentFixture<FileInputControlComponent>;
  let service: TlsFileUploadService;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileInputControlComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: TlsFileUploadService, useClass: MockTlsFileUploadService },
        { provide: ModalService, useClass: MockModalService },
      ],
    }).compileComponents();

    service = TestBed.inject(TlsFileUploadService);
    modalService = TestBed.inject(ModalService);
    fixture = TestBed.createComponent(FileInputControlComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should set initial form values', () => {
      spyOn(service, 'getFiles').and.returnValue(of([MockCertFile]));
      const simpleChanges = {
        fieldControl: new SimpleChange(
          undefined,
          new FileInputControl({
            controlName: 'file',
            label: 'File Label',
            placeholder: 'File Placeholder',
            required: true,
            validators: [Validators.required],
            multiple: true,
          }),
          true
        ),
        formValue: new SimpleChange(undefined, '1234', true),
      };
      component.ngOnChanges(simpleChanges);
      component.ngAfterViewInit();
      service.getFiles().subscribe({
        next: (results) => expect(results).toEqual([MockCertFile]),
        complete: () => {},
      });
      expect(service.getFiles).toHaveBeenCalled();
      expect(component.formControl['file'].valid).toBeTruthy();
      expect(component.formControl['file'].value).toEqual('1234');
    });
  });

  describe('selectFiles', () => {
    beforeEach(() => {
      spyOn(service, 'getFiles').and.returnValue(
        of([
          {
            id: '1234',
            name: 'filename',
            description: 'describe',
          },
        ])
      );
      const simpleChanges = {
        fieldControl: new SimpleChange(
          undefined,
          new FileInputControl({
            controlName: 'file',
            label: 'File Label',
            placeholder: 'File Placeholder',
            required: true,
            validators: [Validators.required],
            multiple: true,
          }),
          true
        ),
        formValue: new SimpleChange(undefined, '1234', true),
      };
      component.ngOnChanges(simpleChanges);
      component.ngAfterViewInit();
      service.getFiles().subscribe({
        complete: () => {},
      });
    });

    it('should set selectedFiles', () => {
      spyOn(service, 'upload').and.returnValue(of(MockCertFile));
      spyOn(modalService, 'openModal').and.returnValue(of({ type: 'Add', file: MockCertFile }));
      component.fileUpload = jasmine.createSpyObj(['close']);
      component.modifyFile({ type: 'Add', tls: null });
      modalService.openModal(new Modal(TestComponent, {})).subscribe({
        next: (results) => expect(results).toEqual({ type: 'Add', file: MockCertFile }),
        complete: () => {},
      });
      service.upload(MockCertFile.file as any).subscribe({
        next: (result) => expect(result).toEqual(MockCertFile),
        complete: () => {},
      });
      expect(service.upload).toHaveBeenCalled();
    });

    it('should call deleteFile', () => {
      spyOn(service, 'deleteFile').and.returnValue(of());
      spyOn(modalService, 'openModal').and.returnValue(of({ type: 'Delete', file: MockCertFile }));
      component.modifyFile({ type: 'Delete', tls: MockCertFile });
      modalService.openModal(new Modal(TestComponent, {})).subscribe({
        next: (results) => expect(results).toEqual({ type: 'Delete', file: MockCertFile }),
        complete: () => {},
      });
      expect(component.formControl[component.fieldControl.controlName].value).toEqual('1234');
    });
  });
});
