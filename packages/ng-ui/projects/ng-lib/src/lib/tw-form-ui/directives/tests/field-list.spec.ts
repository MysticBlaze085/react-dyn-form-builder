import { Field, FieldBuilder } from '../../models';

import { AdkFieldList } from '../field-list';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

@Component({
    standalone: true,
    selector: 'adk-host',
    template: ``,
    hostDirectives: [AdkFieldList],
})
class HostComponent {}

describe('AdkList', () => {
    let list: AdkFieldList<Field>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent],
        }).compileComponents();
        const fixture = TestBed.createComponent(HostComponent);
        list = fixture.debugElement.injector.get(AdkFieldList);
    });

    it('should add fields', () => {
        expect(list.fields()).toEqual([]);
        const field1 = FieldBuilder.createField('text', 'field_1', '', 'Field 1', '', {
            required: false,
            minLength: 3,
        });
        const field2 = FieldBuilder.createOptionsField(
            'text',
            'field_2',
            '',
            '',
            [{ id: 'option_1', value: 'option1', label: 'option1' }],
            {
                required: false,
                minLength: 3,
            }
        );
        list.add(field1);
        expect(list.fields()).toEqual([field1]);

        list.add(field2);
        expect(list.fields()).toEqual([field1, field2]);
    });

    it('should update fields', () => {
        const field1 = FieldBuilder.createField('text', 'field_1', '', 'Field 1', '', {
            required: false,
            minLength: 3,
        });
        const updateField = FieldBuilder.createField('text', 'update', '', 'Field 1', '', {
            required: false,
            minLength: 3,
        });
        list.add(field1);
        list.update(updateField);
        expect(list.get(updateField.id)).toEqual(updateField);
    });

    it('should remove fields', () => {
        const field1 = FieldBuilder.createField('text', 'field_1', '', 'Field 1', '', {
            required: false,
            minLength: 3,
        });
        const field2 = FieldBuilder.createOptionsField(
            'text',
            'field_2',
            '',
            '',
            [{ id: 'option_1', value: 'option1', label: 'option1' }],
            {
                required: false,
                minLength: 3,
            }
        );
        list.add(field1);
        list.add(field2);
        list.remove(field1);
        expect(list.fields()).toEqual([field2]);
    });

    it('should clear fields', () => {
        const field1 = FieldBuilder.createField('text', 'field_1', '', 'Field 1', '', {
            required: false,
            minLength: 3,
        });
        const field2 = FieldBuilder.createOptionsField(
            'text',
            'field_2',
            '',
            '',
            [{ id: 'option_1', value: 'option1', label: 'option1' }],
            {
                required: false,
                minLength: 3,
            }
        );
        list.add(field1);
        list.add(field2);
        list.clear();
        expect(list.fields()).toEqual([]);
    });
});
