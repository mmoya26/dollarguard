import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request is being intercepted...');

  const requestWithCredentials = req.clone({
    withCredentials: true
  });

  return next(requestWithCredentials);
};
