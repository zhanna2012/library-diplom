import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiPageAbstract } from "../../../shared/abstract/api-page.abstract";
import { ApiService } from "../../../shared/services/api.service";
import { JsonServerService } from "../../../shared/services/json-server.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent  extends ApiPageAbstract implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public override apiService: ApiService, private jsonServerService: JsonServerService, ) {
    super(apiService)
  }

  ngOnInit(): void {
    this.gridData = this.jsonServerService.getSuggestions().pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
