import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authToken = localStorage.getItem('access_token');
  // If the request URL includes 'oauth', skip adding the bearer token
  if (req.url.includes('/oauth/v2/token') || req.url.includes('atlas/iam/me')) {
    return next(req);
  }

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      'x-atlas-authorization': `Bearer ${authToken}`,
      'content-type': 'application/json',
    },
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};
