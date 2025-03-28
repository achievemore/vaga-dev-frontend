import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private snackbarSubject = new Subject<string>();
  snackbarState$ = this.snackbarSubject.asObservable();

  show(message: any ) {
    this.snackbarSubject.next(message);
  }
}
