/* eslint-disable @typescript-eslint/unbound-method */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { SimpleChange, SimpleChanges } from '@angular/core';

import { ExampleFormFieldConfig } from 'src/testing/jasmine.mock';
import { FormInputControlComponent } from './form-input-control.component';
import { FormInputControlModule } from './form-input-control.module';
import { IDropdownOptionGroup } from '../../models';
import { TextInputControl } from '@core/shared/modules/lyn-dyn-form/helpers';

const previousValue = {
  ...new TextInputControl({
    controlName: 'test',
    label: 'text test',
    placeholder: 'Test PlaceHolder',
    value: '',
    required: true,
  }),
};
const currentValue = {
  ...new TextInputControl({
    controlName: 'test',
    label: 'text test',
    placeholder: 'Test PlaceHolder',
    value: '',
    required: true,
  }),
};
const isFirstChange: boolean = false;

const changesObj: SimpleChanges = {
  control: new SimpleChange(previousValue, currentValue, isFirstChange),
};

const changesObj2: SimpleChanges = {
  control: new SimpleChange(previousValue, undefined, false),
};

describe('FormInputControlComponent', () => {
  let component: FormInputControlComponent;
  let fixture: ComponentFixture<FormInputControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormInputControlModule],
      declarations: [FormInputControlComponent],
      providers: [UntypedFormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputControlComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({ test: new UntypedFormControl('') });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnChanges control object happy path', () => {
    spyOn(component, 'ngOnChanges').and.callThrough();
    component.ngOnChanges(changesObj);
    expect(component.ngOnChanges).toHaveBeenCalled();
  });

  it('should call ngOnChanges control object un-happy path', () => {
    spyOn(component, 'ngOnChanges').and.callThrough();
    component.ngOnChanges(changesObj2);
    expect(component.ngOnChanges).toHaveBeenCalled();
  });

  it('should call onFieldChanges and emit formGroupValues', () => {
    spyOn(component.formControlChanges, 'emit').and.callThrough();
    component.onControlChanges();
    component.form.patchValue({ test: 'string' });
    expect(component.formControlChanges.emit).toHaveBeenCalled();
  });

  it('should map dropdown option group value', () => {
    spyOn(component.formControlChanges, 'emit');
    const getOptions = ExampleFormFieldConfig.filter((input: { controlName: string }) => input.controlName === 'filters')[0]
      .options as IDropdownOptionGroup<any>[];
    component.onDropdownOptionGroupChanges('testControl', getOptions, ['rewriteUrl']);
    expect(component.formControlChanges.emit).toHaveBeenCalled();
  });

  it('should addValueToSelectionList', () => {
    spyOn(component.addItem, 'emit');
    component.addValueToSelectionList({ group: { subGroup: { control: [] } } });
    expect(component.addItem.emit).toHaveBeenCalled();
  });
  it('should removeValueToSelectionList', () => {
    spyOn(component.removeItem, 'emit');
    component.removeValueToSelectionList({ group: { subGroup: { control: [] } } });
    expect(component.removeItem.emit).toHaveBeenCalled();
  });
});
