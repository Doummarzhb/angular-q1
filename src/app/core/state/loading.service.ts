import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  isLoading$ = this._loading.asObservable();

  show() {
    this._loading.next(true);
  }

  hide() {

    setTimeout(() => this._loading.next(false), 2000);
  }
}
