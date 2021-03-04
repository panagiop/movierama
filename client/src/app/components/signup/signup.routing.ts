import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';

const routes: Routes = [{ path: '', component: SignupComponent }];

export default RouterModule.forChild(routes);
