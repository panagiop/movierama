import {
	Component,
	OnInit
} from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { ApiService } from 'src/app/services/api.service';

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
}
