import { Component} from '@angular/core';
import { environment } from './../environments/environment';
import { ConfigService } from '@modules/authentication/services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(configService: ConfigService) {
		configService.apiUrl = environment.articlesApiUrl;
	}

	ngOnInit() {
		
	}

}
