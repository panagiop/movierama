import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
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
		if (token && !this.authService.tokenExpired(token)) {
			void this.router.navigate(['/']).then().catch();
		}
		this.loginForm = this.formBuilder.group({
			email: [
				'',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				[Validators.required, Validators.email]
			],
			// eslint-disable-next-line @typescript-eslint/unbound-method
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	get f() {
		return this.loginForm.controls;
	}

	onSubmit(): void {
		this.isSubmitted = true;
		if (this.loginForm.invalid) {
			return;
		}
		this.authService
			.login({
				email: this.loginForm.value.email,
				password: this.loginForm.value.password
			})
			.subscribe(
				(data) => {
					this.authService.saveToken(data.token);
          this.authService.saveUser(this.loginForm.value.email);
					this.router.navigate(['/']);
				},
				(err) => {
					this.responseError = err.error.message;
					setTimeout(() => {
						this.responseError = '';
					}, 3000);
				}
			);
	}
}
