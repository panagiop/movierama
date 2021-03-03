import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { SortingComponent } from './components/sorting/sorting.component';
import { CalculateElapsedTime } from './pipes/calculate-elapsed-time.pipe';

import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { HeaderModule } from './components/header/header.module';

@NgModule({
	declarations: [
		AppComponent,
		MovieListComponent,
		SortingComponent,
		CalculateElapsedTime
	],
	imports: [
    AppRoutingModule,
		BrowserModule,
		HttpClientModule,
		ReactiveFormsModule,
		HeaderModule
	],
	providers: [authInterceptorProviders],
	bootstrap: [AppComponent]
})
export class AppModule {}
