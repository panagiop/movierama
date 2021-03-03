import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

const API = 'http://localhost:1234/api/v1/';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(private http: HttpClient) {}

	getAllMovies(queryParams: string): Observable<Movie[]> {
		return this.http.get<Movie[]>(`${API}movies${queryParams}`);
	}

	likeMovie(movieId: string): Observable<Movie> {
		return this.http.put<Movie>(`${API}movies/${movieId}/like`, {});
	}

	hateMovie(movieId: string): Observable<Movie> {
		return this.http.put<Movie>(`${API}movies/${movieId}/hate`, {});
	}

	resetVote(movieId: string): Observable<Movie> {
		return this.http.put<Movie>(`${API}movies/${movieId}/reset`, {});
	}

	createMovie(name: string, description: string): Observable<Movie> {
		return this.http.post<Movie>(`${API}movies`, { name, description });
	}
}
