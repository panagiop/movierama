import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HeaderModule } from '../header/header.module';
import { AddMovieComponent } from './add-movie.component';
import routing from './add-movie.routing';

@NgModule({
	declarations: [AddMovieComponent],
	imports: [routing, CommonModule, FormsModule, ReactiveFormsModule, HeaderModule]
})
export class AddMovieModule {}
