import { TestBed } from '@angular/core/testing';

import { ModalSideDrawerService } from './modal-side-drawer.service';

describe('ModalSideDrawerService', () => {
  let service: ModalSideDrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalSideDrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
