import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userServiceAccessGuard } from './user-service-access.guard';

describe('userServiceAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userServiceAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
