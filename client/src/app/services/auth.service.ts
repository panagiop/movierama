import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/movie';

const AUTH_API = 'http://localhost:1234/api/v1/login';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient) {}

	public login(credentials: {
		email: string;
		password: string;
	}): Observable<any> {
		return this.http.post(
			AUTH_API,
			{
				email: credentials.email,
				password: credentials.password
			},
			httpOptions
		);
	}

	public logout(): void {
		localStorage.clear();
	}

	public saveToken(token: string): void {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.setItem(TOKEN_KEY, token);
	}

	public getToken(): string {
		return localStorage.getItem(TOKEN_KEY) || '';
	}

	public saveUser(user: User): void {
		localStorage.removeItem(USER_KEY);
		localStorage.setItem(USER_KEY, JSON.stringify(user));
	}

	public getUser(): User {
		return (localStorage &&
			localStorage.getItem(USER_KEY) &&
			JSON.parse(localStorage.getItem(USER_KEY) || '')) as Record<
			string,
			never
		>;
	}

	public isTokenExpired(token: string): boolean {
		const expiryDate = token && JSON.parse(atob(token.split('.')[1])).exp;
		return Math.floor(new Date().getTime() / 1000) >= expiryDate;
	}
}
