import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { PasswordComponent } from '../password.component';

describe('PasswordComponent', () => {
    let component: PasswordComponent;
    let fixture: ComponentFixture<PasswordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, ReactiveFormsModule, PasswordComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form control on ngOnChanges', () => {
        const field = { key: 'password', formControl: new FormControl('') };
        component.ngOnChanges({ field: { currentValue: field } as any });
        expect(component.formControl[field.key]).toBeInstanceOf(AbstractControl);
    });

    it('should toggle password visibility', () => {
        expect(component.showPassword).toBeFalsy();
        component.togglePasswordVisibility();
        expect(component.showPassword).toBeTruthy();
        component.togglePasswordVisibility();
        expect(component.showPassword).toBeFalsy();
    });
});
