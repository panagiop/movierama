import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { AuthGuardService } from './services/auth.guard.service';

const routes: Routes = [
	{ path: 'home', component: MovieListComponent },
	{
		path: 'signup',
		loadChildren: () =>
			import('./components/signup/signup.module').then((m) => m.SignupModule)
	},
	{
		path: 'login',
		loadChildren: () =>
			import('./components/login/login.module').then((m) => m.LoginModule)
	},
	{
		path: 'add-movie',
		loadChildren: () =>
			import('./components/add-movie/add-movie.module').then(
				(m) => m.AddMovieModule
			),
		canLoad: [AuthGuardService]
	},
	{
		path: '**',
		redirectTo: 'home',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
