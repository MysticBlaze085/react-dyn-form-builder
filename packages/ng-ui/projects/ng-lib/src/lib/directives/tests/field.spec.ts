import { AdkFields } from '../field';
import { Component } from '@angular/core';
import { Field } from '../../tw-form-ui/models';
import { TestBed } from '@angular/core/testing';

@Component({
    standalone: true,
    selector: 'adk-host',
    template: ``,
    hostDirectives: [AdkFields],
})
class HostComponent {}
describe('AdkFields Directive', () => {
    let directive: AdkFields<Field>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent],
        }).compileComponents();

        const fixture = TestBed.createComponent(HostComponent);
        directive = fixture.debugElement.injector.get(AdkFields);
    });

    it('should create the directive', () => {
        expect(directive).toBeTruthy();
    });
});
