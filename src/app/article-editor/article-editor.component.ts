import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from "./../services/articles.service";
import { ThemePalette } from '@angular/material/core';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
        //'Authorization': 'my-auth-token'
    })
};

@Component({
  	selector: 'app-article-editor',
  	templateUrl: './article-editor.component.html',
  	styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {

	public options: Object = {
  		placeholderText: 'Edit Your Content Here!',
  		heightMin: 500,
        charCounterCount: true,
        imageUploadURL: environment.imageUploadURL,
        imageManagerLoadURL: environment.imageManagerLoadURL,
        imageManagerDeleteURL: environment.imageManagerDeleteURL,
        key: 'AV:4~?3xROKLJKYHROLDXDR@d2YYGR_Bc1A8@5@4:1B2D2F2F1?1?2A3@1C1'
    }

    public options2: Object = {
        placeholderText: "Choisi une image pour la cover de l'article",
        charCounterCount: false,
        imageUploadURL: environment.imageUploadURL,
        imageManagerLoadURL: environment.imageManagerLoadURL,
        imageManagerDeleteURL: environment.imageManagerDeleteURL,
        toolbarButtons: {
            'moreRich': {
                'buttons': ['insertImage']
            }
        },
        quickInsertEnabled: false,
        key: 'AV:4~?3xROKLJKYHROLDXDR@d2YYGR_Bc1A8@5@4:1B2D2F2F1?1?2A3@1C1'
    };

    editorContent:any;
    editorContent2:any;
    checkoutForm:any;
    article: any;
    isNewArticle: boolean;
    isPublished: boolean;
    color: ThemePalette = 'warn';

  	constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private articlesService: ArticlesService,
    ) { 
        this.checkoutForm = this.formBuilder.group({
            title: '',
            author: '',
            url: '',
            description: '',
            keywords: '',
            altSEOImg: ''
        });

        this.isPublished = false;

        // Permet de savoir si on créé un nouvel article ou si on en update un
        if(!this.route.snapshot.queryParams.articleId) {
            this.isNewArticle = true;
            this.editorContent = '<article><p>&nbsp;<\/p><p><span>Afin de toujours connaître l’actu <a href="https:\/\/www.droneez.com\/">DRONEEZ<\/a>&nbsp;nous vous invitons à&nbsp;liker&nbsp;<\/span><\/p><p><span>notre&nbsp;<a href="https:\/\/www.facebook.com\/droneez">page&nbsp;Facebook<\/a>&nbsp;et à vous inscrire à notre&nbsp;<a>newsletter<\/a>&nbsp;!<\/span><\/p><p><span>Mille mercis pour votre fidélité !<\/span><\/p><p>&nbsp;<\/p><div class="end"><span><strong>Que le drone soit avec vous!<\/strong><\/span><\/div><div class="end"><span><strong>L’équipe DRONEEZ<\/strong><\/span><\/div><p>&nbsp;<\/p><\/div> <\/article>';
        } else {
            this.isNewArticle = false;

            articlesService.getArticleById(this.route.snapshot.queryParams.articleId).subscribe((data)=>{
                this.article = data;
                console.dir(this.article);      

                this.editorContent = this.article.content;
                this.editorContent2 = '<img src="' + environment.articlesFilesUrl + '/' + this.article.cover + '" style="width: 300px;" class="fr-fic fr-dib fr-draggable">';
                this.isPublished = this.article.status === "published";

                this.checkoutForm.patchValue({
                    title: this.article.title,
                    author: this.article.author,
                    url: this.article.url,
                    description: this.article.description,
                    keywords: this.article.keywords,
                    altSEOImg: this.article.seo_image_alt
                });
            });
        }
    }

  	ngOnInit() {
  	}

    onSubmit(formObject) {
        this.sendArticle(formObject);
    }

    sendArticle(article) {
        if(this.isNewArticle) {
            this.create(article).subscribe( res =>{
                console.dir(res);
            },
            error => {
                console.log(error.message);
            });
        } else {
            this.update(article, this.route.snapshot.queryParams.articleId).subscribe( res =>{
                console.dir(res);
            },
            error => {
                console.log(error.message);
            });
        }
    }

    create(newArticle): Observable<any> {
        //format date into "aaaa-mm-ddThh:mm:ss+00:00"
        let date = new Date(Date.now()).toISOString().substring(0,11)+new Date(Date.now()).toString().substring(16,33);
        date = date.slice(0,19)+date.slice(23,26)+':'+date.slice(26);

        let cover = this.editorContent2.substring(this.editorContent2.search('00_articles_files')+18);
        cover = cover.substring(0,cover.search('"'));

        let article = {
            author:newArticle.author,
            published_time:date,
            modified_time:date,
            title:newArticle.title,
            content: this.editorContent,
            url:newArticle.url,
            media_folder_name:"",
            description:newArticle.description,
            cover: cover,
            status: this.isPublished ? "published" : "draft",
            template:"3",
            type:"article",
            section:"Evenements",
            keywords:newArticle.keywords,
            seo_image_name:cover,
            seo_image_alt:newArticle.altSEOImg,
            seo_image_type:"image\/" + cover.substring(cover.search("[.]")+1)
        };
        let json = JSON.stringify(article);
        let url = environment.articlesCreateUrl;
        return this.http.post<any>(url, json, httpOptions)
            .pipe(
                tap((datas) => {
                    //console.log(datas);
                }),
                //catchError(this.handleError<any>("goPayment")),
            );
    }

    update(article, articleId): Observable<any> {
        //format date into "aaaa-mm-ddThh:mm:ss+00:00"
        let date = new Date(Date.now()).toISOString().substring(0,11)+new Date(Date.now()).toString().substring(16,33);
        date = date.slice(0,19)+date.slice(23,26)+':'+date.slice(26);

        let cover = this.editorContent2.substring(this.editorContent2.search('00_articles_files')+18);
        cover = cover.substring(0,cover.search('"'));

        let articleUpdated = {
            author: article.author,
            published_time: this.article.published_time,
            modified_time: date,
            title: article.title,
            content: this.editorContent,
            url: article.url,
            media_folder_name: this.article.media_folder_name,
            description: article.description,
            cover: cover,
            status:  this.isPublished ? "published" : "draft",
            template: this.article.template,
            type: this.article.type,
            section: this.article.section,
            keywords: article.keywords,
            seo_image_name: cover,
            seo_image_alt: article.altSEOImg,
            seo_image_type: "image\/" + cover.substring(cover.search("[.]")+1)
        };
        let json = JSON.stringify(articleUpdated);
        let url = environment.articlesUpdateUrl + articleId;
        return this.http.post<any>(url, json, httpOptions)
            .pipe(
                tap((datas) => {
                    //console.log(datas);
                }),
                //catchError(this.handleError<any>("goPayment")),
            );
    }

}
