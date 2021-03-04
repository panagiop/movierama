import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import routing from './login.routing';
import { LoginComponent } from './login.component';
import { HeaderModule } from '../header/header.module';

@NgModule({
	declarations: [LoginComponent],
	imports: [
		routing,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		HeaderModule
	]
})
export class LoginModule {}
