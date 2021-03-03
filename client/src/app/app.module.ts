import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { SortingComponent } from './components/sorting/sorting.component';
import { CalculateElapsedTime } from './pipes/calculate-elapsed-time.pipe';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';

import { authInterceptorProviders } from './interceptors/auth.interceptor';

@NgModule({
	declarations: [
		AppComponent,
		MovieListComponent,
		SortingComponent,
		CalculateElapsedTime,
		LoginComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule
	],
	providers: [authInterceptorProviders],
	bootstrap: [AppComponent]
})
export class AppModule {}
