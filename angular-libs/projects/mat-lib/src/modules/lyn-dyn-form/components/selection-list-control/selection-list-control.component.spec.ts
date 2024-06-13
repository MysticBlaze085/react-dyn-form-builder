import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { ISelectionListModel } from '../../models';
import { SelectionListControlComponent } from './selection-list-control.component';
import { SelectionListControlModule } from './selection-list-control.module';
import { SelectionListInputControl } from '../../helpers/selection-list.helper';
import { SimpleChange } from '@angular/core';

describe('SelectionListControlComponent', () => {
  let component: SelectionListControlComponent;
  let fixture: ComponentFixture<SelectionListControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SelectionListControlModule],
      declarations: [SelectionListControlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('SelectionListControlComponent ngOnChanges happy path', () => {
    beforeEach(() => {
      component.inputControl = new SelectionListInputControl({
        group: 'exampleGroup',
        subGroup: 'exampleSuGroup',
        controlName: 'headerNames',
        label: 'Exclude Response Header Name:',
        addControlName: 'headerName',
        addInputLabel: 'Exclude Response Header Name',
        addInputValidation: [],
        placeholder: 'Exclude Response Header Name',
        required: true,
        errorMessage: 'Must have at least one response header name',
        validators: [],
        value: [],
      }) as ISelectionListModel;

      component.formValue = ['string'];

      fixture.detectChanges();
      spyOn(component, 'ngOnChanges').and.callThrough();
      component.ngOnChanges({
        inputControl: new SimpleChange(true, component.inputControl, false),
        formValue: new SimpleChange(true, component.formValue, false),
      });
      fixture.detectChanges();
      expect(component.ngOnChanges).toHaveBeenCalled();
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should addValueToSelectionList', () => {
      component.form = new UntypedFormGroup({
        controlOne: new UntypedFormControl(''),
        controlTwo: new UntypedFormControl(['abc']),
      });
      spyOn(component.addItem, 'emit');
      component.addValueToSelectionList('', '', 'controlTwo', 'controlOne', 'abc');
      expect(component.form.value['controlTwo']).toEqual(['abc']);
      expect(component.addItem.emit).toHaveBeenCalled();
    });
    it('should removeValueToSelectionList', () => {
      component.form = new UntypedFormGroup({
        controlOne: new UntypedFormControl(''),
        controlTwo: new UntypedFormControl(['abc']),
      });
      spyOn(component.removeItem, 'emit');
      component.removeValueToSelectionList('', '', 'controlTwo', 'abc');
      expect(component.form.value['controlTwo']).toEqual([]);
      expect(component.removeItem.emit).toHaveBeenCalled();
    });
  });

  describe('SelectionListControlComponent ngOnChanges un-happy path inputControl', () => {
    beforeEach(() => {
      fixture.detectChanges();
      spyOn(component, 'ngOnChanges').and.callThrough();
      component.ngOnChanges({
        inputControl: new SimpleChange(true, undefined, false),
        formValue: new SimpleChange(true, undefined, false),
      });
      fixture.detectChanges();
      expect(component.ngOnChanges).toHaveBeenCalled();
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('SelectionListControlComponent ngOnChanges un-happy path formValue', () => {
    beforeEach(() => {
      fixture.detectChanges();
      component.inputControl = new SelectionListInputControl({
        group: 'exampleGroup',
        subGroup: 'exampleSuGroup',
        controlName: 'headerNames',
        label: 'Exclude Response Header Name:',
        addControlName: 'headerName',
        addInputLabel: 'Exclude Response Header Name',
        addInputValidation: [],
        placeholder: 'Exclude Response Header Name',
        required: true,
        errorMessage: 'Must have at least one response header name',
        validators: [],
        value: [],
      }) as ISelectionListModel;

      spyOn(component, 'ngOnChanges').and.callThrough();
      component.ngOnChanges({
        inputControl: new SimpleChange(true, component.inputControl, false),
        formValue: new SimpleChange(true, undefined, false),
      });
      fixture.detectChanges();
      expect(component.ngOnChanges).toHaveBeenCalled();
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
