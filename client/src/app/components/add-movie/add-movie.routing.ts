import { Routes, RouterModule } from '@angular/router';
import { AddMovieComponent } from './add-movie.component';

const routes: Routes = [{ path: '', component: AddMovieComponent }];

export default RouterModule.forChild(routes);
