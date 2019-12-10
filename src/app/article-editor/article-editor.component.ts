import { Component, OnInit } from '@angular/core';

@Component({
  	selector: 'app-article-editor',
  	templateUrl: './article-editor.component.html',
  	styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {

	public options: Object = {
  		placeholderText: 'Edit Your Content Here!',
  		heightMin: 500,
	}

  	constructor() { }

  	ngOnInit() {
  	}

}
