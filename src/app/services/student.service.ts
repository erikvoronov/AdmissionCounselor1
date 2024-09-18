import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private BASE = 'https://randomuser.me/api';
  private SEED = 'brad'
  private RESULT_COUNT = 5;

  data;
  private dataSource;

  constructor(private http: HttpClient) {
    this.vars();
    this.fetch();
  }

  private vars(): void {
    this.dataSource = new BehaviorSubject([]);
    this.data = this.dataSource.asObservable();
  }

  private fetch(): void {

    const url = `${this.BASE}?seed=${this.SEED}&results=${this.RESULT_COUNT}`;

    this.http.get(url)
      .subscribe(result =>
      {this.dataSource.next(result);
      console.log('student.service.ts', 'result', result);
    });
  }
}
