import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { URLS } from "../app.config";
import { Filter } from "../main/main-content/filter.model";

@Injectable()
export class CocktailsService {

  constructor(private http: HttpClient) {
  }


  getFilters(param: HttpParams): Observable<Filter> {
    return this.http.get<Filter>(URLS.FILTERS, {params : param});
  };

  getCocktails(param: HttpParams): Observable<any> {
    return this.http.get(URLS.COCKTAILS, {params : param});
  }
}
