import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiPageAbstract } from "../../../shared/abstract/api-page.abstract";
import { ApiService } from "../../../shared/services/api.service";
import { SearchService } from "../../../shared/services/search.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent extends ApiPageAbstract implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public override apiService: ApiService, private searchService: SearchService) {
    super(apiService)
  }

  ngOnInit(): void {
  }

  searchData() {
    this.gridData = this.searchService.getSearchValues(this.searchValue).pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
