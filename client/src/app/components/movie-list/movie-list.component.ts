import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
	public movies: any = [];
	public field = 'createdAt';
	public direction = 1;
	public loggedinUser = '';

	constructor(
		private apiService: ApiService,
		public authService: AuthService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.fetchMovies();
	}

	fetchMovies(): void {
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

	orderBy(sort: { field: string; direction: string }): void {
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

	canUserVote(userId?: string, movieCreatedBy?: string): boolean {
		return movieCreatedBy !== userId;
	}

	canLikeButtonBeEnabled(userId?: string, likedByIds?: string[]): boolean {
		if (likedByIds && !likedByIds.length) {
			return true;
		}
		return !this.hasUserLikedTheMovie(userId, likedByIds);
	}

	canHateButtonBeEnabled(userId?: string, hatedByIds?: string[]): boolean {
		if (hatedByIds && !hatedByIds.length) {
			return true;
		}
		return !this.hasUserHatedTheMovie(userId, hatedByIds);
	}

	hasUserLikedTheMovie(userId?: string, likedByIds?: string[]): boolean {
		if (likedByIds && likedByIds.length) {
			return likedByIds.includes(userId || '');
		}
		return false;
	}

	hasUserHatedTheMovie(userId?: string, hatedByIds?: string[]): boolean {
		if (hatedByIds && hatedByIds.length) {
			return hatedByIds.includes(userId || '');
		}
		return false;
	}

	likeMovie(movieId: string = ''): void {
		this.apiService.likeMovie(movieId).subscribe(
			() => this.fetchMovies(),
			(err) => {
				console.log(err);
			}
		);
	}

	hateMovie(movieId: string = ''): void {
		this.apiService.hateMovie(movieId).subscribe(
			() => this.fetchMovies(),
			(err) => {
				console.log(err);
			}
		);
	}

	resetVote(movieId: string = ''): void {
		this.apiService.resetVote(movieId).subscribe(
			() => this.fetchMovies(),
			(err) => {
				console.log(err);
			}
		);
	}
}
