import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from './services/i18n.service';
@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private i18nService: I18nService) {}

  transform(key: string): string {
    const currentLanguage = this.i18nService.getCurrentLanguage();
    const translations = require(`./${currentLanguage}.json`);
    return translations[key] || key;
  }


}
