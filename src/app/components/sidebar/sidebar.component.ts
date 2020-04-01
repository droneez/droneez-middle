import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from '@modules/authentication/services';
import { User } from '@modules/authentication/models';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    //{ path: '/article-editor', title: 'Article Editor',  icon:'create', class: '' },
   // { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
   // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
   // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
   // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
   // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
   // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
   // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
