import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { URLS } from '../../app.config';
import { Filter } from '../../main/filter/filter.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {

  drinksCategoriesSubject: Subject<any> = new Subject<any>();
  drinksCategories: Observable<any> = this.drinksCategoriesSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getFilters(param: HttpParams): Observable<Filter> {
    return this.http.get<Filter>(URLS.FILTERS, {params : param});
  }

  getCocktails(param: HttpParams): Observable<any> {
    return this.http.get(URLS.COCKTAILS, {params : param});
  }
}
