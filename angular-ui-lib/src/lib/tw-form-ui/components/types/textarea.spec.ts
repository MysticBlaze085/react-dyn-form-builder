import { TextareaComponent } from './textarea.component';
import { Field } from '../../models';

describe('InputComponent', () => {
  let component: TextareaComponent;

  beforeEach(() => {
    component = new TextareaComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form control on ngOnChanges', () => {
    const field: Field = {
      key: 'testField',
      formControl: {} as any, // Mocking a form control object
      props: {
        autocomplete: 'on',
      },
    } as any;
    const changes = { field: { currentValue: field } };
    component.ngOnChanges(changes as any);
    expect(component.formControl[field.key]).toBeTruthy();
  });

  it('should have default autocomplete value if not provided', () => {
    const field: Field = {
      key: 'testField',
      formControl: {} as any, // Mocking a form control object
      props: {},
    } as any;
    const changes = { field: { currentValue: field } };
    component.ngOnChanges(changes as any);
    expect(component.autocomplete).toBe('off'); // Default value should be 'off'
  });

  it('should set inputClass based on props or default value', () => {
    const fieldWithInputClass: Field = {
      key: 'testField',
      formControl: {} as any, // Mocking a form control object
      props: {
        inputClass: 'custom-input-class',
      },
    } as any;
    const changes = { field: { currentValue: fieldWithInputClass } };
    component.ngOnChanges(changes as any);
    expect(component.inputClass).toBe('custom-input-class');

    const fieldWithoutInputClass: Field = {
      key: 'testField',
      formControl: {} as any, // Mocking a form control object
      props: {},
    } as any;
    const changes2 = { field: { currentValue: fieldWithoutInputClass } };
    component.ngOnChanges(changes2 as any);
    expect(component.inputClass).toBe(
      'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
    );
  });
});
