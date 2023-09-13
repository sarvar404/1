import { HttpClient } from '@angular/common/http';
import { Inject, Injectable ,LOCALE_ID} from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  setLanguage(language: string) {
    throw new Error('Method not implemented.');
  }
  private translatedDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});

  translate: any;
 
 

  constructor(@Inject(LOCALE_ID) protected localeId: string,private http: HttpClient) {
    
   }
   private configureTranslation(): void {
    this.translate.addLangs(['en', 'es','fr']); 
    this.translate.setDefaultLang('en'); // Set default language
   
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|es|fr/) ? browserLang : 'en');

    // Load translations from JSON files
    this.translate.setTranslation('en', require('../../assets/translate/en.json'));
    this.translate.setTranslation('es', require('../../assets/translate/es.json'));
   this.translate.setTranslation('fr', require('../../assets/translate/fr.json'));
  }
  getTranslatedData() {
    return this.translatedDataSubject.asObservable();
  }
  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }
  
}
