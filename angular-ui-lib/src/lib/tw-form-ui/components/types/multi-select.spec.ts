import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Field, FieldBuilder, FieldOptions } from '../../models';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MultiSelectComponent } from './multi-select.component';

describe('MultiSelectComponent', () => {
  let component: MultiSelectComponent;
  let fixture: ComponentFixture<MultiSelectComponent>;
  const field: Field = FieldBuilder.createField('select', 'select', '', 'Select', 'Select', {
    class: 'sm:col-span-3',
    isMultipleTag: true,
    required: true,
    minLength: 3,
    options: [
      {
        value: 'optionOne',
        label: 'Option One',
        id: '1',
      },
      {
        value: 'optionTwo',
        label: 'Option Two',
        id: '2',
      },
      {
        value: 'optionThree',
        label: 'Option Three',
        id: '3',
      },
    ],
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReactiveFormsModule, MultiSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectComponent);
    component = fixture.componentInstance;
    component.ngOnChanges({ field: { currentValue: field } as any });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle open state when toggle() is called', () => {
    const initialState = component.open;
    component.toggle();
    expect(component.open).toEqual(!initialState);
  });

  it('should clear selected options and form control value when clearOption() is called', () => {
    component.selectedOptions = field.props && field.props.options ? [field.props.options[0] as FieldOptions] : [];
    component.clearOption();
    expect(component.selectedOptions.length).toEqual(0);
    expect(component.formControl[component.field.key].value).toEqual('');
  });

  it('should set selected option value to form control when toggleOption() is called with single selection', () => {
    const option: FieldOptions = {
      value: 'option1',
      label: 'Option 1',
      id: '1',
    };
    component.toggleOption(option);
    expect(component.formControl[component.field.key].value).toEqual([option.value]);
  });

  it('should add and remove selected options and update form control value when toggleOption() is called with multiple selection', () => {
    const option1: FieldOptions = {
      value: 'option1',
      label: 'Option 1',
      id: '1',
    };
    const option2: FieldOptions = {
      value: 'option2',
      label: 'Option 2',
      id: '2',
    };

    // Adding first option
    component.toggleOption(option1);
    expect(component.selectedOptions).toContain(option1);
    expect(component.formControl[component.field.key].value).toEqual([option1.value]);

    // Adding second option
    component.toggleOption(option2);
    expect(component.selectedOptions).toContain(option2);
    expect(component.formControl[component.field.key].value).toEqual([option1.value, option2.value]);

    // Removing first option
    component.toggleOption(option1);
    expect(component.selectedOptions).not.toContain(option1);
    expect(component.formControl[component.field.key].value).toEqual([option2.value]);
  });

  it('should set selected option value to form control when toggleOption() is called with single selection and isMultipleTag is false', () => {
    const field: Field = FieldBuilder.createField('select', 'select', '', 'Select', 'Select', {
      class: 'sm:col-span-3',
      isMultipleTag: false,
      required: true,
      minLength: 3,
      options: [
        {
          value: 'optionOne',
          label: 'Option One',
          id: '1',
        },
        {
          value: 'optionTwo',
          label: 'Option Two',
          id: '2',
        },
        {
          value: 'optionThree',
          label: 'Option Three',
          id: '3',
        },
      ],
    });
    component.ngOnChanges({ field: { currentValue: field } as any });
    component.toggleOption(component.options[0]);
    expect(component.formControl[component.field.key].value).toEqual(component.options[0].value);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
