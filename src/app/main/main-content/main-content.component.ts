import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CocktailsService } from '../../shared/services/cocktails.service';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Drinks } from './drink.model';
import { Subject, throwError } from 'rxjs';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContentComponent implements OnInit, OnDestroy {

  selectedCategories: string[] = [];
  drinks: Drinks[] = [];
  isScrollActive: boolean = true;
  isAllCocktailsLoaded: boolean = false;
  private key: string = 'c';
  private counter: number;
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(private cocktailService: CocktailsService,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getFilteredCaterogies();
  }

  get isContentLoaded(): boolean {
    return this.selectedCategories.length > 0;
  }

  getFilteredCaterogies(): void {
    this.cocktailService.drinksCategories$.pipe(
      takeUntil(this.unsubscribe$),
      tap((categories: string[]) => {
        this.setSelectedCategories(categories);
        this.resetProperties();
        this.checkForAvailableDrinks();
      }),
      catchError((err) => throwError(err))
    ).subscribe();
  }

  setSelectedCategories(categories): void {
    this.selectedCategories = categories;
    this.isAllCocktailsLoaded = false;
  }

  resetProperties(): void {
    this.counter = 0;
    this.isScrollActive = true;
    this.drinks = [];
  }

  getCategory(): string {
    return this.selectedCategories[this.counter];
  }

  getDrinks(): void {
    const param = new HttpParams().set(this.key, this.getCategory());
    this.cocktailService.getCocktails(param).pipe(
      takeUntil(this.unsubscribe$),
      map((drinks: Drinks) => {
        return {...drinks, name: this.getCategory()};
      }),
      tap((drink: Drinks) => {
        this.drinks.push(drink);
        this.counter++;
        this.handleScrollingIssue();
        this.cdRef.markForCheck();
      }),
      catchError((err) => throwError(err))
    ).subscribe();
  }

  checkForAvailableDrinks(): void {
    if (this.selectedCategories.length <= this.counter) {
      this.isScrollActive = false;
      this.isAllCocktailsLoaded = true;
      return;
    }
    this.getDrinks();
  }

  handleScrollingIssue(): void {
    if (!this.isScrollVisible(window.document.body) && this.selectedCategories.length > 1) {
      this.checkForAvailableDrinks();
    }
  }

  isScrollVisible({clientHeight, scrollHeight}): boolean {
    return scrollHeight > clientHeight;
  }

  nextCategoriesByScroll(): void {
    this.checkForAvailableDrinks();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
