import { Component, OnInit } from '@angular/core';
import { Movie } from './models/movie';
import { ApiService } from './services/api.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public movies: any = [];
	public field = 'createdAt';
	public direction = 1;

	constructor(private apiService: ApiService) {}

	ngOnInit(): void {
		this.apiService
			.getAllMovies(`?sortBy=${this.field}&dir=${this.direction}`)
			.subscribe(
				(movies: Movie[]) => {
					this.movies = movies;
				},
				(err) => {
					console.log(err);
				}
			);
	}

	orderBy(sort: { field: string, direction: string }): void {
		this.apiService
			.getAllMovies(`?sortBy=${sort.field}&dir=${sort.direction}`)
			.subscribe(
				(movies: Movie[]) => {
					this.movies = movies;
				},
				(err) => {
					console.log(err);
				}
			);
	}

	calculateNumberOfDaysPassed(date: Date): string {
		const now: any = new Date();
		const then: any = new Date(date);
		const numberOfDays = (now - then) / 8.64e7;
		if (numberOfDays < 1) {
			if (Math.ceil(numberOfDays * 24) > 1) {
				return `${Math.ceil(numberOfDays * 24)} hours ago`;
			}
			return `${Math.ceil(numberOfDays * 24)} hour ago`;
		}
    if (Math.floor(numberOfDays) === 1) {
      return `${Math.floor(numberOfDays)} day ago`;
    }
		return `${Math.floor(numberOfDays)} days ago`;
	}
}
