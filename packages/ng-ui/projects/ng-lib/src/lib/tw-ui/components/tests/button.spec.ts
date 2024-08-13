// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';
import { ButtonComponent } from '../button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default values for inputs', () => {
        expect(component.variant).toBe('filled');
        expect(component.color).toBe('primary');
        expect(component.type).toBe('button');
        expect(component.customClasses).toBe('');
        expect(component.bgColor).toBe('bg-blue-500');
        expect(component.textColor).toBe('text-white');
        expect(component.hoverEffect).toBe('hover:shadow-lg');
        expect(component.disabledEffect).toBe('opacity-50 cursor-not-allowed opacity-50 disabled:cursor-not-allowed disabled:opacity-50');
    });
});
