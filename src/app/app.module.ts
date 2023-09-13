import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
// import { ScrollTrackerDirective } from './directives/scroll-tracker.directive';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CacheInterceptor } from './interceptors/cache-interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { CacheResolverService } from './services/cache-resolver.service';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PinVerificationDialogModule } from './components/pin-verification-dialog/pin-verification-dialog.module';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { I18nService } from './services/i18n.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



export function HttpLoaderFactory(http: HttpClient) {
  const now = new Date().getTime();
  return new TranslateHttpLoader(http, './assets/translate/',  `.json?v=${now}`);
}

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    ToastModule,
    MatDialogModule,
    MatSnackBarModule,
    PinVerificationDialogModule,
    MatButtonModule,
    MatMenuModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }})
  ],
  
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},MessageService,CacheResolverService ,TranslatePipe,
  I18nService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CacheInterceptor,
    multi: true
  },
  // {
  //   provide: RouteReuseStrategy,
  //   useClass: CustomReuseStrategy,
  // }
],
  
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
