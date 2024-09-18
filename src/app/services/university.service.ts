import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  // http://universities.hipolabs.com/search?name=oak&country=United+States

  private BASE = 'http://universities.hipolabs.com/search';
  private NAME_SEARCH = 'oak';
  private COUNTRY = 'United+States';

  data;
  private dataSource;

  constructor(private http: HttpClient) {
    this.vars();
    this.fetch();
  }

  private vars(): void{
    this.dataSource = new BehaviorSubject([]);
    this.data = this.dataSource.asObservable();

  }

  private fetch(): void{
    const url = `${this.BASE}?name=${this.NAME_SEARCH}&country=${this.COUNTRY}`;

    this.http.get(url)
      .subscribe(
        result => {
          this.dataSource.next(result);
          console.log('university.service.ts', 'result', result);
        }
      );
  }
}
