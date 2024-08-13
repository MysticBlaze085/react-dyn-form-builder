import { AdkList } from '../list';
import { Component } from '@angular/core';
import { FieldOptions } from '../../models';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

@Component({
    standalone: true,
    selector: 'adk-host',
    template: ``,
    hostDirectives: [AdkList],
})
class HostComponent {}

describe('AdkList', () => {
    let list: AdkList<FieldOptions>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent],
        }).compileComponents();
        const fixture = TestBed.createComponent(HostComponent);
        list = fixture.debugElement.injector.get(AdkList);
    });

    it('should add items', () => {
        expect(list.items()).toEqual([]);
        list.add({ id: 1, value: 'Item 1', label: 'Item 1 Name' });
        expect(list.items()).toEqual([{ id: 1, value: 'Item 1', label: 'Item 1 Name' }]);
        list.add({ id: 2, value: 'Item 2', label: 'Item 2 Name' });
        expect(list.items()).toEqual([
            { id: 1, value: 'Item 1', label: 'Item 1 Name' },
            { id: 2, value: 'Item 2', label: 'Item 2 Name' },
        ]);
    });

    it('should update items', () => {
        list.add({ id: 1, value: 'Item 1', label: 'Item 1 Name' });
        list.update({
            id: 1,
            value: 'Todo 1 Updated',
            label: 'Item 1 Name Update',
        });
        expect(list.get(1)).toEqual({
            id: 1,
            value: 'Todo 1 Updated',
            label: 'Item 1 Name Update',
        });
    });

    it('should remove items', () => {
        list.add({ id: 1, value: 'Item 1', label: 'Item 1 Name' });
        list.add({ id: 2, value: 'Item 2', label: 'Item 2 Name' });
        list.remove({ id: 1, value: 'Item 1', label: 'Item 1 Name' });
        expect(list.items()).toEqual([{ id: 2, value: 'Item 2', label: 'Item 2 Name' }]);
    });

    it('should clear items', () => {
        list.add({ id: 1, value: 'Item 1', label: 'Item 1 Name' });
        list.add({ id: 2, value: 'Item 2', label: 'Item 2 Name' });
        list.clear();
        expect(list.items()).toEqual([]);
    });
});
