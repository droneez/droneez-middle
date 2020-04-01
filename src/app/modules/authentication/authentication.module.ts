import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminLayoutModule } from '@app/layouts/admin-layout';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AlertComponent, LoginComponent, RegisterComponent } from './components';
import { ErrorInterceptor, JwtInterceptor/*, AuthenticationGuard*/ } from './helpers';
//import { User } from './models';
import { AlertService, AuthenticationService, UserService, ConfigService } from './services';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthenticationRoutingModule,
        AdminLayoutModule
    ],
    declarations: [
  	    AlertComponent,
  	    LoginComponent,
  	    RegisterComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AlertService, 
        //AuthenticationService,
        UserService
        //ConfigService
    ]
    //bootstrap: []
})
export class AuthenticationModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthenticationModule,
            providers: [
                //{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, 
                ConfigService,
                AuthenticationService
            ]
        };
    }
}
