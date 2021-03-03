import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanLoad {
	constructor(private router: Router, public authService: AuthService) {}

	canLoad(): boolean {
		const token = this.authService.getToken();
		if (token && !this.authService.isTokenExpired(token)) {
			return true;
		}
		void this.router.navigate(['/home']);
		return false;
	}
}
