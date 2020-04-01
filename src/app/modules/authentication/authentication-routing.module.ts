import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, RegisterComponent } from './components';
import { AuthenticationGuard } from './helpers';

import { AdminLayoutComponent } from '@app/layouts/admin-layout';

const routes: Routes = [
    { 
    	path: '', 
    	component: AdminLayoutComponent, 
    	children: [{
      		path: '',
      		loadChildren: '@app/layouts/admin-layout/admin-layout.module#AdminLayoutModule',
      		canActivate: [AuthenticationGuard]
    	}]
    },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { 

}
