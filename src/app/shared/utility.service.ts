import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  genId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
