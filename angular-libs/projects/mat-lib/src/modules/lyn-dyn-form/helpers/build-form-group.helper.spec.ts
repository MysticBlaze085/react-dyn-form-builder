import { TestBed, inject } from '@angular/core/testing';

import { BuildFormGroupControls } from '.';
import { ExampleFormFieldConfig } from 'src/testing/jasmine.mock';
import { UntypedFormBuilder } from '@angular/forms';

describe('BuildFormGroupControls', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [UntypedFormBuilder],
    }).compileComponents();
  });

  it('BuildFormGroupControls builds form group', inject([UntypedFormBuilder], () => {
    const formGroup = new BuildFormGroupControls(ExampleFormFieldConfig).formGroup;
    expect(Object.keys(formGroup.controls).length).toEqual(8);
  }));
});
