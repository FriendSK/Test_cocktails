import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loadingStatus: Observable<boolean> = this.loadingSubject.asObservable();
}
