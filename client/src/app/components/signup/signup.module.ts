import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import routing from './signup.routing';
import { SignupComponent } from './signup.component';
import { HeaderModule } from '../header/header.module';

@NgModule({
	declarations: [SignupComponent],
	imports: [
		routing,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		HeaderModule
	]
})
export class SignupModule {}
