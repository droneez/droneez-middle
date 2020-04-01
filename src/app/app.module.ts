import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { AgmCoreModule } from '@agm/core';

import { ConfigService } from './services/config.service';
import { AuthenticationModule } from '@modules/authentication';

export function loadConfigurations(configService: ConfigService) {
    return () => configService.getConfig();
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    AuthenticationModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    ConfigService,
    {provide: APP_INITIALIZER, useFactory: loadConfigurations, deps: [ConfigService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
