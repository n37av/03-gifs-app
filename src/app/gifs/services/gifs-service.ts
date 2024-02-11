import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

//const GIPHY_API_KEY = 'YYH8MTGsFw9vm8CSjlkULLSZhmXBGQ9c';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string  = 'YYH8MTGsFw9vm8CSjlkULLSZhmXBGQ9c';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient) {
    this.loadLocalHistory();
    console.log('Gifs Service Ready');
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalHistory();
  }

  private saveLocalHistory():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory) );
  }

  private loadLocalHistory():void{
    if ( !localStorage.getItem('history') ) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if (this._tagsHistory.length === 0) return;

    this.searchTag( this._tagsHistory[0] );
  }

  public searchTag( tag: string ):void{
    //console.log("Entro en searchTag");

    if (tag.length === 0)  return;

    this.organizeHistory( tag );
    //this._tagsHistory.unshift( tag );

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit','10')
      .set('q', tag);

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( resp => {

        //console.log(resp);
        this.gifList = resp.data;
        //console.log( { gif: this.gifList });

      });
    /*
    fetch('https://api.giphy.com/v1/gifs/search?api_key=YYH8MTGsFw9vm8CSjlkULLSZhmXBGQ9c&q=Valorant&limit=10')
      .then( resp => resp.json() )
      .then( data => console.log(data) );
    */
    //console.log(this.tagsHistory);
  }



}
