import { Component, OnInit } from '@angular/core';
import { ArticlesService } from "./../services/articles.service";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {

	articles: any[];
	articlesFilesUrl: string;

    constructor(
        private articlesService: ArticlesService,
    ) { 
  	    this.articlesFilesUrl = environment.articlesFilesUrl;
		articlesService.getArticlesInfosAll().subscribe((data)=>{
		    this.articles = data;
		    console.dir(data);		    
		});
    }

	ngOnInit() {
	  	
  	}

}


