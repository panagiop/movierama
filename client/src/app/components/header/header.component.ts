import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	@Output() logout = new EventEmitter();
	public isLoggedIn = false;
	public loggedinUserEmail = '';

	constructor(public authService: AuthService) {}

	ngOnInit(): void {
		this.isLoggedIn = !!this.authService.getToken();
		this.loggedinUserEmail =
			(this.authService.getUser() && this.authService.getUser().email) || '';
	}

	onLogout(): void {
		this.authService.logout();
		this.isLoggedIn = false;
		this.logout.emit(this.isLoggedIn);
	}
}
