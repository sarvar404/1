import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { I18nService } from './services/i18n.service';
import {Carousel} from 'primeng/carousel';
import { CancelService } from './services/cancel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'moontv-web';
  

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,

    private i18nService: I18nService,

    private cancelService: CancelService
    

    ) {

  }


  ngOnDestroy() {
    //this.scrollSubscription?.unsubscribe();
  }
  ngOnInit() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.cancelService.cancelRequests();
        }
        if (event instanceof NavigationEnd) {
          if (
            event.id === 1 &&
            event.url === event.urlAfterRedirects
          ) {
            console.log('This was redirected to the Project Component');
           // this.router.navigate(['new-home']);
          }
          
        }
      });
      Carousel.prototype.changePageOnTouch = (e,diff) => {
        
       
      }
      Carousel.prototype.onTouchMove = () => { };
      
  }
 
}
