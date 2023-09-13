import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CancelService {
  private cancelSource = new Subject<void>();
  cancel$ = this.cancelSource.asObservable();

  cancelRequests() {
    this.cancelSource.next();
  }
}
