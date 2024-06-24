import { AuthService, FetchTokenConfig } from '../services';

/**
 * Pre loads Auth as a promise used within a module
 */
export function preloadAuth(authService: AuthService, oidcParams: FetchTokenConfig) {
  return () =>
    authService
      .fetchAdminToken(oidcParams)()
      .then(() => authService.fetchCurrentUser());
}
