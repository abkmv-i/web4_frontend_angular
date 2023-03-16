import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderContentService {
  headers: any = {
    'index': 'Авторизация',
    'main': 'Страница сессии',
    'reg': 'Регистрация'
  };
}
