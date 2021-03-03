import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-add-movie',
	templateUrl: './add-movie.component.html',
	styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
	public addForm!: FormGroup;
	public isSubmitted = false;
	public responseError = '';

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private apiService: ApiService
	) {}

	ngOnInit(): void {
		this.addForm = this.formBuilder.group({
			name: ['', [Validators.required]],
			description: ['', [Validators.required, Validators.minLength(2)]]
		});
	}

	get f(): any {
		return this.addForm.controls;
	}

	onSubmit(): void {
		this.isSubmitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.apiService
			.createMovie(
				this.addForm.get('name')?.value,
				this.addForm.get('description')?.value
			)
			.subscribe(
				() => {
					void this.router.navigate(['/home']);
				},
				(err) => {
					console.log(err);
				}
			);
	}
}
