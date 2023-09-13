import { Directive, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Directive({
  selector: '[appSessionCheck]'
})
export class SessionCheckDirective  {

  constructor(private _authService: AuthService,
    private elementRef: ElementRef) { }
  ngOnInit(): void {
    this._authService.check()
      .subscribe(_authenticated => {

        if (!_authenticated) {
          this.elementRef.nativeElement.style.display = 'none';
        } else {
          this.elementRef.nativeElement.style.display = 'block';
        }


      })
      ;

  }

}
