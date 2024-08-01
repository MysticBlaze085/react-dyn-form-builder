import { RadioComponent } from './radio.component';
import { Field } from '../../models';

describe('RadioComponent', () => {
  let component: RadioComponent;

  beforeEach(() => {
    component = new RadioComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return props options or empty array', () => {
    // Testing with options provided in props
    const fieldWithOptions: Field = {
      props: {
        options: [
          { id: '1', value: 'Option 1', label: 'Option 1 Label' },
          { id: '2', value: 'Option 2', label: 'Option 2 Label' },
        ],
      },
    } as any;
    component.field = fieldWithOptions;
    expect(component.options.length).toBe(2);

    // Testing with no options provided in props
    const fieldWithoutOptions: Field = {
      props: {},
    } as any;
    component.field = fieldWithoutOptions;
    expect(component.options.length).toBe(0);
  });

  it('should have default autocomplete value if not provided', () => {
    const field: Field = {
      props: {},
    } as any;
    component.field = field;
    expect(component.autocomplete).toBe('off'); // Default value should be 'off'
  });

  it('should set inputClass based on props or default value', () => {
    // Testing with inputClass provided in props
    const fieldWithInputClass: Field = {
      props: {
        inputClass: 'custom-input-class',
      },
    } as any;
    component.field = fieldWithInputClass;
    expect(component.inputClass).toBe('custom-input-class');

    // Testing with no inputClass provided in props
    const fieldWithoutInputClass: Field = {
      props: {},
    } as any;
    component.field = fieldWithoutInputClass;
    expect(component.inputClass).toBe('h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'); // Default inputClass value
  });
});
