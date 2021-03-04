import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
	public loginForm!: FormGroup;
	public isSubmitted = false;
	public responseError = '';

	constructor(
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private router: Router
	) {}

	ngOnInit(): void {
		const token = this.authService.getToken();
		if (token && !this.authService.isTokenExpired(token)) {
			void this.router.navigate(['/']).then().catch();
		}
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	get f(): any {
		return this.loginForm.controls;
	}

	onSubmit(): void {
		this.isSubmitted = true;
		if (this.loginForm.invalid) {
			return;
		}
		this.authService
			.login({
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				email: this.loginForm.get('email')?.value,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				password: this.loginForm.get('password')?.value
			})
			.subscribe(
				(data: { token: string; user: Record<string, never> }) => {
					this.authService.saveToken(data.token);
					this.authService.saveUser(data.user);
					void this.router.navigate(['/']).then().catch();
				},
				(err: { error: { message: string } }) => {
					this.responseError = err.error.message;
					setTimeout(() => {
						this.responseError = '';
					}, 3000);
				}
			);
	}
}
