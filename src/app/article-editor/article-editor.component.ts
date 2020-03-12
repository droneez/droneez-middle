import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from "./../services/articles.service";

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
        articlesService.getArticleById(this.route.snapshot.queryParams.articleId).subscribe((data)=>{
            this.article = data;
            console.dir(this.article);      
            this.editorContent = this.article.content;
            this.checkoutForm.patchValue({author:this.article.author});
            /*
            id: "79"
            author: "Matthieu Perillaud"
            published_time: "2020-03-12T16:26:05+01:00"
            modified_time: "2020-03-12T16:26:05+01:00"
            title: "Un DJI MINI un petit qui a tout d'un grand !"
            content: "<article><p><img src="https://www.droneez.com/00_articles_files/PHOTO DJI MAVIC MINI_3.jpg" style="width: 300px;" class="fr-fic fr-dib"></p><p><br></p><h3>DJI MAVIC MINI &ndash; CLARIFICATION SUR LE POIDS</h3><p><br></p><p>DJI vient de frapper fort avec son nouveau &laquo; &nbsp;Mavic Mini &raquo; pesant seulement 249 grammes, &nbsp;ce qui lui permet de se situer sous la barre symbolique des 250 grammes !</p><p>Symbolique ? Pas tant que &ccedil;a en r&eacute;alit&eacute; !</p><p>POURQUOI CETTE BARRE DES 250 GRAMMES ?</p><p>La raison en est que nos amis am&eacute;ricains, plus pr&eacute;cis&eacute;ment la FAA (Federal Aviation Administration), qui impose l&rsquo;enregistrement de tous drones de plus de 250 grammes.</p><p>La d&eacute;marche n&rsquo;est qu&rsquo;administrative (et un peu p&eacute;cuniaire : 5$), mais avec ce nouveau Mavic Mini DJI veut aborder le public le plus large possible et simplifier au maximum les d&eacute;marches de ses clients.</p><p><br></p><h3>ET EN FRANCE ?</h3><p>Pour le moment cet enregistrement &agrave; partir de 250 grammes n&rsquo;existe qu&rsquo;aux Etats-Unis, en France c&rsquo;est &agrave; partir de 800 grammes, donc m&ecirc;mes les Mavic Air se trouvent encore sous le seuil, mais &agrave; partir du Mavic 2 Pro et Mavic 2 Zoom l&rsquo;immatriculation est obligatoire.</p><p>Bien entendu, DJI n&rsquo;a pas d&eacute;velopp&eacute; ce drone uniquement pour le march&eacute; am&eacute;ricain, ce coup de ma&icirc;tre consiste &agrave; &nbsp;avoir un temps d&rsquo;avance sur la future r&eacute;glementation harmonis&eacute;e europ&eacute;enne qui devrait sortir en 2020 &ndash; 2021. Cette nouvelle r&egrave;glementation obligera les particuliers &agrave; l&rsquo;immatriculation de tous les drones de plus de&hellip;roulement de tambours&hellip;250 grammes !!!</p><p><br></p><h3>ET POUR LES VOLS EN VILLE ALORS ?</h3><p>D&eacute;sol&eacute; pour tous ceux qui pensaient que ce drone tr&egrave;s l&eacute;ger vous permettrait de voler en ville. En France la r&eacute;glementation est assez claire et cela ne d&eacute;pend aucunement du poids de votre drone :</p><p>Dans les zones autoris&eacute;es (&agrave; la campagne majoritairement) vous pouvez voler avec un drone qui peut peser jusqu&rsquo;&agrave; 25 kg sans probl&egrave;me.</p><p>Dans les zones interdites de survol (les villes, les parcs naturels, les centrales nucl&eacute;aires, la piscine de votre voisine, etc.) c&rsquo;est toujours aussi interdit, m&ecirc;me si votre drone ne p&egrave;se que 1 gramme,</p><p>A noter que dans d&rsquo;autres pays europ&eacute;en les vols en ville sont autoris&eacute;s (ou en tout cas tol&eacute;r&eacute;s) en dessous d&rsquo;un certain poids, &agrave; v&eacute;rifier au cas par cas lors de vos voyages.</p><p><br></p><p>Pour savoir ou voler en ext&eacute;rieur en toute l&eacute;galit&eacute; il y a toujours Geoportail : https://www.geoportail.gouv.fr/donnees/restrictions-pour-drones-de-loisir</p><p>Et pour voler en int&eacute;rieur il y a notre circuit permanent &agrave; Droneez&nbsp;</p><p><img src="https://www.droneez.com/00_articles_files/PHOTO DJI MAVIC MINI_1.jpg" style="width: 300px;" class="fr-fic fr-dib"></p><p>&nbsp;</p><p><span>Afin de toujours connaître l’actu <a href="https://www.droneez.com/">DRONEEZ</a>&nbsp;nous vous invitons à&nbsp;liker&nbsp;</span></p><p><span>notre&nbsp;<a href="https://www.facebook.com/droneez">page&nbsp;Facebook</a>&nbsp;et à vous inscrire à notre&nbsp;<a>newsletter</a>&nbsp;!</span></p><p><span>Mille mercis pour votre fidélité !</span></p><p>&nbsp;</p><div class="end"><span><strong>Que le drone soit avec vous!</strong></span></div><div class="end"><span><strong>L’équipe DRONEEZ</strong></span></div><p>&nbsp;</p></div> </article>"
            url: "djimini-unpetitquiatoutdungrand"
            media_folder_name: ""
            description: "DJI Mini, un petit drone de 249 grammes qui a tout d'un grand mais pas le poids !"
            cover: "PHOTO DJI MAVIC MINI_3.jpg"
            status: "published"
            template: "3"
            type: "article"
            section: "Evenements"
            keywords: "dji,mavic,mini,telepilote,fpv,immersion,scenario"
            seo_image_name: "PHOTO DJI MAVIC MINI_3.jpg"
            seo_image_alt: "Le DJI mini un drone poid plume qui a tout d'un grand !"
            seo_image_type: "image/jpg"    
            */
        });
    }

  	ngOnInit() {
  	}

    sendNewArticle(newArticle) {
        this.create(newArticle).subscribe( res =>{
            console.dir(res);
        },
        error => {
            console.log(error.message);
        });
    }

    onSubmit(formObject) {
        this.sendNewArticle(formObject);
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
            content: "<article>" + this.editorContent + '<p>&nbsp;<\/p><p><span>Afin de toujours connaître l’actu <a href="https:\/\/www.droneez.com\/">DRONEEZ<\/a>&nbsp;nous vous invitons à&nbsp;liker&nbsp;<\/span><\/p><p><span>notre&nbsp;<a href="https:\/\/www.facebook.com\/droneez">page&nbsp;Facebook<\/a>&nbsp;et à vous inscrire à notre&nbsp;<a>newsletter<\/a>&nbsp;!<\/span><\/p><p><span>Mille mercis pour votre fidélité !<\/span><\/p><p>&nbsp;<\/p><div class="end"><span><strong>Que le drone soit avec vous!<\/strong><\/span><\/div><div class="end"><span><strong>L’équipe DRONEEZ<\/strong><\/span><\/div><p>&nbsp;<\/p><\/div> <\/article>',
            url:newArticle.url,
            media_folder_name:"",
            description:newArticle.description,
            cover: cover,
            status:"published",
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
                    console.log(datas);
                }),
                //catchError(this.handleError<any>("goPayment")),
            );
    }

}
