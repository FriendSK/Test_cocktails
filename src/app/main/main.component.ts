import { Component, OnInit } from '@angular/core';
import { Filter } from "./main-content/filter.model";
import { HttpParams } from "@angular/common/http";
import { CocktailsService } from "../shared/cocktails.service";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  //
  // public filters: Filter;
  // private key: string = 'c';
  // private value: string = 'list';
  // private param = new HttpParams().set(this.key , this.value);
  //
  // constructor(private cocktailsService: CocktailsService) { }
  //
  // ngOnInit(): void {
  //   this.cocktailsService.getFilters(this.param).pipe(
  //     tap((filters: Filter) => this.filters = filters),
  //     catchError((err) => throwError(err))
  //   ).subscribe();
  // }
}
