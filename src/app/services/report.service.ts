import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {Hero} from "./hero";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  // 资源的地址定义heroesUrl表单:base/:collectionName
  private heroesUrl = 'api/heroes';  // URL to web api
  // 私有属性中注入构造函数http
  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }
  // 通过HttpClient 获取，.pipe()方法扩展可观察结果并给它一个catchError()运算符
  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // 注射MessageService。将它包装在一个私有log()方法中
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private test(message: string) {
    return 'http://localhost:8889/crosstab?whereSql=cost%3C15&inline=true';
  }
}
