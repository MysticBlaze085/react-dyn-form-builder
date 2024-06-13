import { EditFileComponent } from './edit-file.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MockCertFile } from 'src/testing/jasmine.mock';

describe('EditFileComponent', () => {
  const model = {
    ActionButton: 'Decommission',
    SupportingText: 'Are you sure?',
    data: {},
  };

  let component: EditFileComponent;
  let matDialogRef: MatDialogRef<EditFileComponent>;

  beforeEach(() => {
    matDialogRef = {} as any;
    component = new EditFileComponent(matDialogRef, model as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call delete conditional', () => {
      const mocked = { ...model, data: { type: 'Delete', tls: MockCertFile } } as any;
      component = new EditFileComponent(matDialogRef, mocked.data);
      component.ngOnInit();
      expect(component.form.value).toEqual(MockCertFile);
      expect(component.form.valid).toBeFalsy();
    });
  });

  describe('onFormChanges', () => {
    beforeEach(() => {
      const mocked = { ...model, data: { type: 'Add', tls: null } } as any;
      component = new EditFileComponent(matDialogRef, mocked.data);
      component.ngOnInit();
    });

    it('should set file form values', () => {
      component.onFormChanges({ name: 'File Name' });
      expect(component.form.value['name']).toEqual('File Name');
      component.onFormChanges({ file: MockCertFile.file });
      expect(component.form.value['file']).toEqual(MockCertFile.file);
    });
  });
});
