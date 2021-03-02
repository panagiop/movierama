import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
  Output
} from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit {
	@Input() movies: Movie[] = [];

	ngOnInit(): void {}
}
