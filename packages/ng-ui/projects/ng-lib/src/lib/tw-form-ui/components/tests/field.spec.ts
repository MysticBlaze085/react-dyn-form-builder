import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Field, FieldBuilder } from '../../models';

import { CheckboxComponent } from '../types/checkbox.component';
import { CommonModule } from '@angular/common';
import { FieldComponent } from '../field.component';
import { PasswordComponent } from '../types/password.component';
import { RadioComponent } from '../types/radio.component';
import { TextareaComponent } from '../types/textarea.component';

describe('FieldComponent', () => {
    let component: FieldComponent;
    let fixture: ComponentFixture<FieldComponent>;

    const components = [CheckboxComponent, TextareaComponent, PasswordComponent, RadioComponent];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, FieldComponent, ...components],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should render CheckboxComponent when field type is "checkbox"', () => {
        const field: Field = FieldBuilder.createField('checkbox', 'checkbox', '', 'Checkbox', 'checkbox', {
            required: true,
            minLength: 3,
            options: [
                {
                    value: 'optionOne',
                    label: 'Option One',
                    id: '1',
                    description: 'Option one description',
                },
                {
                    value: 'optionTwo',
                    label: 'Option Two',
                    id: '2',
                    description: 'Option two description',
                },
            ],
        });
        component.field = field;
        fixture.detectChanges();
        const checkboxElement = fixture.nativeElement.querySelector('adk-checkbox');
        expect(checkboxElement).toBeTruthy();
    });

    it('should render TextareaComponent when field type is "textarea"', () => {
        const field: Field = FieldBuilder.createField('textarea', 'about', '', 'About', 'Enter about', {
            class: 'sm:col-span-3',
            required: true,
            minLength: 3,
        });
        component.field = field;
        fixture.detectChanges();
        const checkboxElement = fixture.nativeElement.querySelector('adk-textarea');
        expect(checkboxElement).toBeTruthy();
    });

    it('should render PasswordComponent when field type is "password"', () => {
        const field: Field = FieldBuilder.createField('password', 'password', '', 'Password', 'Enter password', {
            class: 'sm:col-span-3',
            required: true,
            minLength: 3,
        });
        component.field = field;
        fixture.detectChanges();
        const checkboxElement = fixture.nativeElement.querySelector('adk-password-input');
        expect(checkboxElement).toBeTruthy();
    });

    it('should render RadioComponent when field type is "radio"', () => {
        const field: Field = FieldBuilder.createField('radio', 'radio', '', 'radio', 'radio', {
            class: 'sm:col-span-3',
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
            ],
        });
        component.field = field;
        fixture.detectChanges();
        const checkboxElement = fixture.nativeElement.querySelector('adk-radio');
        expect(checkboxElement).toBeTruthy();
    });
    it('should render MultiSelectComponent when field type is "multi-select"', () => {
        const field: Field = FieldBuilder.createField('multi-select', 'multi-select', '', 'multi-select', 'multi-select', {
            class: 'sm:col-span-3',
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
            ],
        });
        component.field = field;
        fixture.detectChanges();
        const checkboxElement = fixture.nativeElement.querySelector('adk-multi-select');
        expect(checkboxElement).toBeTruthy();
    });
});
