import { TestBed } from '@angular/core/testing';

import { NgxAngMatService } from './ngx-ang-mat.service';

describe('NgxAngMatService', () => {
  let service: NgxAngMatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxAngMatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
