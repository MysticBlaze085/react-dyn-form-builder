import { DropdownFieldControlEnums, DropdownFieldHelper } from '@core/shared/modules/dyn-form-control/components/dropdown-field/api';
import { FieldControlEnums, FieldControlHelper } from '@core/shared/modules/dyn-form-control/components/field/api';

import { ButtonControlHelper } from '../../helpers/button-control.helper';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalTemplateComponent } from './modal-template.component';
import { TextareaInputControl } from '@core/shared/modules/lyn-dyn-form/helpers';
import { Validators } from '@angular/forms';

describe('ModalTemplateComponent', () => {
  let component: ModalTemplateComponent;
  let matDialogRef: MatDialogRef<ModalTemplateComponent>;

  describe('ModalTemplate', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('ngOnInnit and checkInnerHtml', () => {
      const data = {
        title: '',
        body: '',
        close: true,
        info: '',
        cancelBtnText: 'Cancel',
        value: '',
        btnControl: [new ButtonControlHelper({})],
      };

      matDialogRef = {} as any;
      component = new ModalTemplateComponent(matDialogRef, data);

      it('should set isInnerHtml to true', () => {
        data.title = '<h1>title</h1>';
        data.body = '<h1>body</h1>';
        component.ngOnInit();
        expect(component.isInnerHtmlTitle).toBeTrue();
        expect(component.isInnerHtmlBody).toBeTrue();
      });
      it('should set isInnerHtml to false', () => {
        data.title = 'title';
        data.body = 'body';
        component.ngOnInit();
        expect(component.isInnerHtmlTitle).toBeFalse();
        expect(component.isInnerHtmlBody).toBeFalse();
      });
      it('should return correct value', () => {
        data.value = 'testValue';
        const testValue = component.closeValue(data.btnControl[0]);
        expect(testValue).toEqual('testValue');
      });
    });

    describe('V0 dynForm Tests', () => {
      it('onFormChanges', () => {
        const data = {
          title: '',
          body: new TextareaInputControl({
            controlName: 'orgName',
            label: 'Organization Name',
            required: true,
            validators: [Validators.required],
          }),
          close: true,
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
        };

        matDialogRef = {} as any;
        component = new ModalTemplateComponent(matDialogRef, data);
        component.ngOnInit();
        expect(component.isForm).toBeTrue();

        component.form.setValue({ orgName: 'test' });
        component.onFormChanges(component.form.value);
        const value = component.closeValue(component.form);
        expect(value.orgName).toEqual('test');
      });
      it('onFormChanges Array', () => {
        const data = {
          title: '',
          body: [
            new TextareaInputControl({
              controlName: 'orgName',
              label: 'Organization Name',
              required: true,
              validators: [Validators.required],
            }),
          ],
          close: true,
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
        };

        matDialogRef = {} as any;
        component = new ModalTemplateComponent(matDialogRef, data);
        component.ngOnInit();
        expect(component.isForm).toBeTrue();

        component.form.setValue({ orgName: 'test' });
        component.onFormChanges(component.form.value);
        const value = component.closeValue(component.form);
        expect(value.orgName).toEqual('test');
      });
    });
    describe('V0 dynForm Tests', () => {
      it('onFormChanges', () => {
        const data = {
          title: '',
          body: new FieldControlHelper({
            controlType: FieldControlEnums.Text,
            controlName: 'orgName',
            label: 'Organization Name',
            placeholder: 'Organization Name',
            required: true,
            validators: [Validators.required],
            value: null,
          }),
          close: true,
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
        };

        matDialogRef = {} as any;
        component = new ModalTemplateComponent(matDialogRef, data);
        component.ngOnInit();
        expect(component.isForm).toBeTrue();

        component.form.setValue({ orgName: 'test' });
        component.onFormChanges(component.form.value);
        const value = component.closeValue(component.form);
        expect(value.orgName).toEqual('test');
      });
      it('onFormChanges Array', () => {
        const data = {
          title: '',
          body: [
            new FieldControlHelper({
              controlType: FieldControlEnums.Text,
              controlName: 'orgName',
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
          close: true,
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
        };

        matDialogRef = {} as any;
        component = new ModalTemplateComponent(matDialogRef, data);
        component.ngOnInit();
        expect(component.isForm).toBeTrue();

        component.form.setValue({ orgName: 'test', type: 'value' });
        component.onFormChanges(component.form.value);
        const value = component.closeValue(component.form);
        expect(value.orgName).toEqual('test');
      });
    });
  });
});
