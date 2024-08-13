import { Field } from '../../../models';
import { FormControl } from '@angular/forms';
import { InputComponent } from '../input.component';

describe('InputComponent', () => {
    let component: InputComponent;

    beforeEach(() => {
        component = new InputComponent();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form control on ngOnChanges', () => {
        const field: Field = {
            key: 'testField',
            formControl: new FormControl(''),
            props: {
                autocomplete: 'on',
            },
        } as any;
        const changes = { field: { currentValue: field } };
        component.ngOnChanges(changes as any);
        expect(component.autocomplete).toEqual('on');
    });

    it('should have default autocomplete value if not provided', () => {
        const field: Field = {
            key: 'testField',
            formControl: new FormControl(''),
            props: {},
        } as any;
        const changes = { field: { currentValue: field } };
        component.ngOnChanges(changes as any);
        expect(component.autocomplete).toEqual('off'); // Default value should be 'off'
    });

    it('should set inputClass based on props or default value', () => {
        const field: Field = {
            key: 'testField',
            formControl: new FormControl(''),
            props: {
                inputClass: 'custom-input-class',
            },
        } as any;
        const changes = { field: { currentValue: field } };
        component.ngOnChanges(changes as any);
        expect(component.inputClass).toEqual('custom-input-class');

        const fieldWithoutInputClass: Field = {
            key: 'testField',
            formControl: new FormControl(''),
            props: {},
        } as any;
        const changes2 = { field: { currentValue: fieldWithoutInputClass } };
        component.ngOnChanges(changes2 as any);
        expect(component.inputClass).toEqual(
            'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'
        );
    });
});
