import { authInterceptor } from './auth.interceptor';
import { tokenInterceptor } from './token.interceptor';

/** Http interceptor providers in outside-in order */
export const CORE_INTERCEPTORS = [tokenInterceptor, authInterceptor];
export * from './auth.provider';
