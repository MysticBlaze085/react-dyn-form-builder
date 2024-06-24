import { CanActivateFn, Router } from '@angular/router';

import { ServiceAccessPipe } from '../pipes/service-access.pipe';
import { inject } from '@angular/core';

export const userServiceAccessGuard: CanActivateFn = (route, state) => {
  const pipe = new ServiceAccessPipe();
  const router = inject(Router);
  const pipeResult = pipe.transform(route.data['serviceId']);

  if (pipeResult) return pipe.transform(route.data['serviceId']);
  return router.navigateByUrl('/');
};
