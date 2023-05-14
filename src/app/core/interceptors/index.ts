import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpLoadingInterceptor } from '@core/interceptors/http-loading.interceptor';

export const INTERCEPTOR_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
];
