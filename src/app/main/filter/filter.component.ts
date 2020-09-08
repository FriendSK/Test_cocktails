import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Filter } from "../main-content/filter.model";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpParams } from "@angular/common/http";
import { CocktailsService } from "../../shared/cocktails.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit, OnDestroy {

  checked: boolean = true;
  filterCategories: FormGroup;
  public filters: Filter;
  private key: string = 'c';
  private value: string = 'list';
  private param = new HttpParams().set(this.key, this.value);
  private sub: Subscription;

  constructor(private fb: FormBuilder,
              private cdRef: ChangeDetectorRef,
              private cocktailsService: CocktailsService) {
  }

  ngOnInit(): void {
    this.getFilters();
    this.filterCategories = this.fb.group({
      filterArray: this.fb.array([], [Validators.required])
    });
  }

  get filtersFormArray(): FormArray {
    return this.filterCategories.controls.filterArray as FormArray;
  }

  get isAtLeastOneCheckboxSelected(): Boolean {
    return !this.filterCategories.controls['filterArray'].errors?.required;
  }

  get isButtonDisabled(): Boolean {
    return !this.isAtLeastOneCheckboxSelected;
  }

  getFilters(): void {
    this.sub = this.cocktailsService.getFilters(this.param).pipe(
      tap((filters: Filter) => {
        this.filters = filters;
        this.addControlCheckboxes();
      }),
      catchError((err) => throwError(err))
    ).subscribe();
  }

  addControlCheckboxes(): void {
    this.filters.drinks.forEach((filter) => {
      this.filtersFormArray.push(new FormControl(filter.strCategory))
    });
  }

  onCheckboxChange(event): void {
    const filtersArray: FormArray = this.filterCategories.get('filterArray') as FormArray;
    if (event.target.checked) {
      filtersArray.push((new FormControl(event.target.value)));
    } else {
      let i: number = 0;
      filtersArray.controls.forEach((item: FormControl) => {
        if (item.value == event.target.value) {
          filtersArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onApplyFilter(): void {
    console.log(this.filterCategories.value);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
