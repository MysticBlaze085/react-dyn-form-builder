/* eslint-disable @typescript-eslint/no-empty-function */

import { ButtonControlHelper, ModalTemplateHelper } from '../../helpers';
import { DropdownFieldControlEnums, DropdownFieldHelper } from '@core/shared/modules/dyn-form-control/components/dropdown-field/api';
import { FieldControlEnums, FieldControlHelper } from '@core/shared/modules/dyn-form-control/components/field/api';
import { fakeAsync, tick } from '@angular/core/testing';

import { ModalWrapperComponent } from './modal-wrapper.component';
import { SimpleChange } from '@angular/core';
import { TextareaInputControl } from '@core/shared/modules/lyn-dyn-form/helpers';
import { Validators } from '@angular/forms';
import { of } from 'rxjs';

class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(),
    };
  }
  afterClosed() {
    return of();
  }
  closeAll() {}
}

describe('ModalWrapperComponent', () => {
  let component: ModalWrapperComponent;
  const dialog = new MatDialogMock() as any;

  beforeEach(() => {
    component = new ModalWrapperComponent(dialog);
    const simpleChanges = {
      modalOptions: new SimpleChange(true, new ModalTemplateHelper({}), true),
    };
    component.ngOnChanges(simpleChanges);
  });

  describe('ngOnInnit and checkInnerHtml', () => {
    beforeEach(() => {
      component.modalOptions = {
        modalTitle: '',
        bodyText: '',
        closeBtn: true,
        info: '',
        cancelBtnText: 'Cancel',
        value: '',
        btnControl: [new ButtonControlHelper({})],
      };
    });

    it('should set isInnerHtml to true', () => {
      const simpleChanges = {
        modalOptions: new SimpleChange(
          true,
          new ModalTemplateHelper({
            modalTitle: '<h1>title</h1>',
            bodyText: '<h1>body</h1>',
          }),
          true
        ),
      };
      component.ngOnChanges(simpleChanges);
      expect(component.isInnerHtmlTitle).toBeTrue();
      expect(component.isInnerHtmlBody).toBeTrue();
    });
    it('should set isInnerHtml to false', () => {
      const simpleChanges = {
        modalOptions: new SimpleChange(
          true,
          new ModalTemplateHelper({
            modalTitle: 'title',
            bodyText: 'body',
          }),
          true
        ),
      };
      component.ngOnChanges(simpleChanges);
      expect(component.isInnerHtmlTitle).toBeFalse();
      expect(component.isInnerHtmlBody).toBeFalse();
    });
    // it('should return correct value', () => {
    //   component.modalOptions.value = 'testValue';
    //   const testValue = component.closeValue(component.modalOptions.btnControl[0]);
    //   expect(testValue).toEqual('testValue');
    // });
  });

  describe('openDialog()', () => {
    it('should ', fakeAsync(() => {
      spyOn(dialog, 'open');
      component.openDialog();
      tick(500);
      expect(dialog.open).toHaveBeenCalled();
    }));
  });

  describe('closeDialog()', () => {
    it('should ', () => {
      spyOn(dialog, 'closeAll');
      component.closeDialog();
      expect(dialog.closeAll).toHaveBeenCalled();
    });
  });

  describe('V0 dynForm Tests', () => {
    it('onFormChanges', () => {
      const simpleChanges = {
        modalOptions: new SimpleChange(
          true,
          new ModalTemplateHelper({
            modalTitle: '',
            bodyText: new TextareaInputControl({
              controlName: 'orgName',
              label: 'Organization Name',
              required: true,
              validators: [Validators.required],
            }),
            closeBtn: true,
            info: '',
            cancelBtnText: 'Cancel',
            value: '',

            btnControl: [
              new ButtonControlHelper({
                btnText: '',
                btnColor: 'primary',
                btnDisabled: false,
                dataCy: 'test',
              }),
            ],
          }),
          true
        ),
      };
      component.ngOnChanges(simpleChanges);
      expect(component.isForm).toBeTrue();

      component.form.setValue({ orgName: 'test' });
      component.onFormChanges(component.form.value);
      const value = component.closeValue(component.form);
      expect(value.orgName).toEqual('test');
    });
    it('onFormChanges Array', () => {
      const simpleChanges = {
        modalOptions: new SimpleChange(
          true,
          new ModalTemplateHelper({
            modalTitle: '',
            bodyText: [
              new TextareaInputControl({
                controlName: 'orgName',
                label: 'Organization Name',
                required: true,
                validators: [Validators.required],
              }),
            ],
            closeBtn: true,
            info: '',
            cancelBtnText: 'Cancel',
            value: '',

            btnControl: [
              new ButtonControlHelper({
                btnText: '',
                btnColor: 'primary',
                btnDisabled: false,
                dataCy: 'test',
              }),
            ],
          }),
          true
        ),
      };
      component.ngOnChanges(simpleChanges);
      expect(component.isForm).toBeTrue();

      component.form.setValue({ orgName: 'test' });
      component.onFormChanges(component.form.value);
      const value = component.closeValue(component.form);
      expect(value.orgName).toEqual('test');
    });
  });
  describe('V0 dynForm Tests', () => {
    it('onFormChanges', () => {
      const simpleChanges = {
        modalOptions: new SimpleChange(
          true,
          new ModalTemplateHelper({
            modalTitle: '',
            bodyText: new FieldControlHelper({
              controlType: FieldControlEnums.Text,
              controlName: 'orgName',
              label: 'Organization Name',
              placeholder: 'Organization Name',
              required: true,
              validators: [Validators.required],
              value: null,
            }),
            closeBtn: true,
            info: '',
            cancelBtnText: 'Cancel',
            value: '',

            btnControl: [
              new ButtonControlHelper({
                btnText: '',
                btnColor: 'primary',
                btnDisabled: false,
                dataCy: 'test',
              }),
            ],
          }),
          true
        ),
      };
      component.ngOnChanges(simpleChanges);
      expect(component.isForm).toBeTrue();

      component.form.setValue({ orgName: 'test' });
      component.onFormChanges(component.form.value);
      const value = component.closeValue(component.form);
      expect(value.orgName).toEqual('test');
    });
    it('onFormChanges Array ', () => {
      const simpleChanges = {
        modalOptions: new SimpleChange(
          true,
          new ModalTemplateHelper({
            modalTitle: '',
            bodyText: [
              new FieldControlHelper({
                controlType: FieldControlEnums.Text,
                controlName: 'orgName',
                label: 'Organization Name',
                placeholder: 'Organization Name',
                required: true,
                validators: [Validators.required],
                value: null,
              }),
              new FieldControlHelper({
                controlType: FieldControlEnums.Text,
                controlName: 'endpoint',
                label: 'Organization Name',
                placeholder: 'Organization Name',
                required: true,
                validators: [Validators.required],
                value: null,
              }),
              new DropdownFieldHelper({
                controlType: DropdownFieldControlEnums.DefaultDropdown,
                controlName: 'type',
                label: 'Alert Type',
                placeholder: 'Alert Type',
                required: true,
                isMultiple: false,
                validators: [Validators.required],
                options: [
                  { isOptionGroup: false, key: 'Alert Type One', value: 'alertTypeOne', dataCy: 'alert-one' },
                  { isOptionGroup: false, key: '400XX Error', value: '400XX Error', dataCy: 'alert-two' },
                ],
                value: null,
                hidden: false,
                hint: 'Alerting type hint',
                dataCy: 'alert-type',
              }),
            ],
            closeBtn: true,
            info: '',
            cancelBtnText: 'Cancel',
            value: '',

            btnControl: [
              new ButtonControlHelper({
                btnText: '',
                btnColor: 'primary',
                btnDisabled: false,
                dataCy: 'test',
              }),
            ],
          }),
          true
        ),
      };
      component.ngOnChanges(simpleChanges);

      expect(component.isForm).toBeTrue();

      component.form.setValue({ orgName: 'test', type: 'value', endpoint: 'http://google.com' });
      component.onFormChanges(component.form.value);
      const value = component.closeValue(component.form);
      expect(value.orgName).toEqual('test');
    });
  });
});
