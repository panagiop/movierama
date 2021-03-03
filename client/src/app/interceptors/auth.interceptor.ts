import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpHandler,
	HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

const AUTH_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		let authReq = req;
		const token = this.authService.getToken();
		if (token) {
			authReq = req.clone({
				headers: req.headers.set(AUTH_HEADER_KEY, 'Bearer ' + token)
			});
		}
		return next.handle(authReq);
	}
}

export const authInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
