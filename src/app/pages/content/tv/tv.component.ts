import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiPageAbstract } from "../../../shared/abstract/api-page.abstract";
import { ApiService } from "../../../shared/services/api.service";
import { Subject, switchMap, takeUntil, tap } from "rxjs";

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent extends ApiPageAbstract implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public override apiService: ApiService) {
    super(apiService)
  }

  ngOnInit(): void {
    this.gridData = this.hasChanges$.pipe(
      takeUntil(this.destroy$),
      switchMap(() => {
        return this.apiService.getTVShows();
      }),
      tap(data => {
        this.gridDataCount = data.length;
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
