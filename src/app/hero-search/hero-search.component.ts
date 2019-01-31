import {Component, OnInit} from '@angular/core';

import {Observable, Subject} from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  // 注意声明heroes$为Observable
  heroes$: Observable<Hero[]>;
  // 该searchTerms属性被声明为RxJS Subject。
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // 等待直到新字符串事件的流程在传递最新字符串之前暂停300毫秒
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // 确保仅在过滤器文本更改时才发送请求
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // 它取消并丢弃先前的搜索可观察量，仅返回可观察的最新搜索服务。
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
