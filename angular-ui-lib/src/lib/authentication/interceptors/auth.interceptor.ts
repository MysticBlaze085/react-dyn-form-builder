import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const token = localStorage.getItem('access_token');

  // if (req.url.includes('iam/me')) {
  //   // modify if userName is null
  //   let user: any = req.body;
  //   if (user.userName === null) {
  //     user = {
  //       ...user,
  //       userName: 'melissa.langhausen@rhapsody.health',
  //       firstName: 'Melissa',
  //       lastName: 'Langhausen',
  //       email: 'melissa.langhausen@rhapsody.health',
  //     };
  //   }
  // }

  // Clone the request and set the Authorization header
  // const authReq = req.clone({
  //   headers: req.headers.set('Authorization', `Bearer ${token}`),
  // });

  return next(req);
};
