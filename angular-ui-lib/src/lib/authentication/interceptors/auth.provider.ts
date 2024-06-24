import { AuthService, FetchTokenConfig } from '../services';

import { APP_INITIALIZER } from '@angular/core';
import { preloadAuth } from './auth-preload';
import { provideHttpClient } from '@angular/common/http';

export const AUTH_PROVIDERS = (oidcParams: FetchTokenConfig) => {
  return [
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => preloadAuth(authService, oidcParams),
      multi: true,
      deps: [AuthService],
    },
  ];
};
