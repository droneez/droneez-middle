import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'table-list',
    pathMatch: 'full',
  }, {
    path: '',
    component: AppComponent,
    children: [{
      path: '',
      loadChildren: '@modules/authentication/authentication.module#AuthenticationModule'  
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
