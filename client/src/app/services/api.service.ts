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
}
