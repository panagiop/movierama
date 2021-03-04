import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
	public signupForm!: FormGroup;
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
		this.signupForm = this.formBuilder.group({
			username: ['', [Validators.required, Validators.minLength(2)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	get f(): any {
		return this.signupForm.controls;
	}

	onSubmit(): void {
		this.isSubmitted = true;
		if (this.signupForm.invalid) {
			return;
		}
		this.authService
			.signup({
				username: this.signupForm.get('username')?.value,
				email: this.signupForm.get('email')?.value,
				password: this.signupForm.get('password')?.value
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
