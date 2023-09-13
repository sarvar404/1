import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy {

  private _unsubscribeAll : Subject<any> = new Subject<any>();
  
  constructor( private _activatedRoute : ActivatedRoute,
    private _router : Router)
  {
  }

  ngOnInit(): void {

   this._router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    takeUntil(this._unsubscribeAll)
   ).subscribe(() => {


 
 
    


      let route = this._activatedRoute;
      while(route.firstChild){
        route = route.firstChild;
      }
      const paths = route.pathFromRoot;
      paths.forEach((path) => {
      //if(path.routeConfig && path.routeConfig.data && path.routeConfig.data.layout){
        //this.layout = path.routeConfig.data.layout;
      //}

      });


   })
  }

  ngOnDestroy(): void {
   
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
