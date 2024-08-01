import { CheckboxComponent } from './checkbox.component';
import { Field } from '../../models';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;

  beforeEach(() => {
    component = new CheckboxComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form group on ngOnChanges', () => {
    const field: Field = {
      props: {
        options: [{ id: '1', value: 'Option 1', label: 'Option 1 Label' }],
      },
    } as any;
    component.ngOnChanges({ field: { currentValue: field } } as any);
    expect(component.formGroup).toBeTruthy();
  });

  it('should update form control value on onChange', () => {
    const field: Field = {
      props: {
        options: [{ id: '1', value: 'Option 1', label: 'Option 1 Label' }],
      },
    } as any;
    component.ngOnChanges({ field: { currentValue: field } } as any);

    const option = { id: '1', value: 'Option 1', label: 'Option 1 Label' };
    component.onChange(option);

    const control = component.formGroup.get(option.id);
    expect(control?.value).toBe(true);
  });
});
