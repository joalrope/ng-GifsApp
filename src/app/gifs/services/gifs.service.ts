import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private urlBase: string = 'https://api.giphy.com/v1/gifs';
  private _apiKey: string = 'uBc8hZRlOLMVgyjXu9ddRxVl1qN6LRXk';
  private _limit: number = 10;
  private _history: string[] = [];

  public results: Gif[] = [];
  public gralResults: any = {};

  get history(): string[] {
    return [...this._history];
  }

  get apiKey(): string {
    return this._apiKey;
  }

  get limit(): number {
    return this._limit;
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('data')!) || [];
    this.gralResults = JSON.parse(localStorage.getItem('gralResults')!) || {};
  }

  clearHistory() {
    this._history = [];
  }

  pushGifs(query: string) {
    if (!this._history.includes(query)) {
      this._history.unshift(query.toLowerCase());
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));

      const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', this.limit)
        .set('q', query);

      console.log(params.toString());

      this.http
        .get<SearchGifsResponse>(`${this.urlBase}/search`, { params })
        .subscribe((resp) => {
          this.results = resp.data;
          localStorage.setItem('data', JSON.stringify(this.results));
          this.gralResults[query] = this.results;
          localStorage.setItem('gralResults', JSON.stringify(this.gralResults));
        });
    }
  }
}
