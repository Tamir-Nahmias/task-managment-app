import { Injectable } from '@angular/core';
import translations from './he.json';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private dictionary: Record<string, any> = translations;

  t(key: string): string {
    const keys = key.split('.');
    let result: any = this.dictionary;
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key;
      }
    }
    return typeof result === 'string' ? result : key;
  }
}
