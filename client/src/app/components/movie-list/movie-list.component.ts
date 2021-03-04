import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { getQueryParameter } from './utils';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html'
})
export class MovieListComponent implements OnInit {
	public movies: any = [];
	public field = 'createdAt';
	public direction = -1;
	public isLoggedIn = false;
	public query = '';

	constructor(
		private apiService: ApiService,
		public authService: AuthService
	) {}

	ngOnInit(): void {
		this.isLoggedIn = !!this.authService.getToken();
		this.query = `?sortBy=${this.field}&dir=${this.direction}`;
		this.fetchMovies(this.query);
	}

	fetchMovies(queryParams: string): void {
		this.apiService.getAllMovies(queryParams).subscribe(
			(movies: Movie[]) => {
				this.movies = movies;
			},
			(err) => console.log(err)
		);
	}

	orderBy(sort: { field: string; direction: string }): void {
		if (this.query.includes('createdBy')) {
			const createdByValue = getQueryParameter('createdBy', this.query);
			this.query = `?createdBy=${createdByValue}`.concat(
				`&sortBy=${sort.field}&dir=${sort.direction}`
			);
			return this.fetchMovies(this.query);
		}
		this.query = `?sortBy=${sort.field}&dir=${sort.direction}`;
		this.fetchMovies(this.query);
	}

	onClearFilters(): void {
		this.query = `?sortBy=${this.field}&dir=${this.direction}`;
		this.fetchMovies(this.query);
	}

	fetchMoviesByUserId(userId?: string): void {
		this.query = this.query.concat(`&createdBy=${userId}`);
		this.fetchMovies(this.query);
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

	canBeTheFirstToVote(likedByIds?: string[], hatedByIds?: string[]): boolean {
		return !likedByIds!.length && !hatedByIds!.length;
	}

	likeMovie(movieId: string = ''): void {
		this.apiService.likeMovie(movieId).subscribe(
			() => this.fetchMovies(this.query),
			(err) => console.log(err)
		);
	}

	hateMovie(movieId: string = ''): void {
		this.apiService.hateMovie(movieId).subscribe(
			() => this.fetchMovies(this.query),
			(err) => console.log(err)
		);
	}

	resetVote(movieId: string = ''): void {
		this.apiService.resetVote(movieId).subscribe(
			() => this.fetchMovies(this.query),
			(err) => console.log(err)
		);
	}

	onLogout(isLoggedIn: boolean): void {
		this.isLoggedIn = isLoggedIn;
	}

	trackByMovieId(index: number, movie: Movie): any {
		return movie._id;
	}
}
