import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiPageAbstract } from "../../../shared/abstract/api-page.abstract";
import { ApiService } from "../../../shared/services/api.service";
import { MatDialog } from "@angular/material/dialog";
import { ManualDialogComponent } from "../../../shared/custom-components/manual-dialog/manual-dialog.component";
import { ManualMovieModel } from "../../../shared/models/manual-movie.model";
import { ApproveDialogComponent } from "../../../shared/custom-components/approve-dialog/approve-dialog.component";
import { JsonServerService } from "../../../shared/services/json-server.service";
import { SnackBarService } from 'src/app/shared/services/snackbar.service';
import { SearchService } from "../../../shared/services/search.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss']
})
export class SuggestComponent extends ApiPageAbstract implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  displayFlag: boolean = false;
  formFlag: boolean = false;

  suggestManual!: ManualMovieModel;

  constructor(public override apiService: ApiService,
              public dialog: MatDialog,
              private jsonServer: JsonServerService,
              private snackBService: SnackBarService,
              private searchService: SearchService) {
    super(apiService)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ManualDialogComponent, {
      maxWidth: '560px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.suggestManual = result;
      if(this.suggestManual.title && this.suggestManual.url) {
        this.jsonServer.addManual(this.suggestManual)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
          () => {
            this.dialog.open(ApproveDialogComponent, {
              maxWidth: '560px',
            });
          },
          () => {
            this.snackBService.openSnackBar('Something went wrong', 'Ok')
          },
        );
      } else {
        this.snackBService.openSnackBar('The form is invalid', 'Ok')
      }
    });
  }


  searchData() {
    this.formFlag = false
    this.gridData = this.searchService.getSearchValues(this.searchValue).pipe(takeUntil(this.destroy$));
    this.gridData
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
      this.displayFlag = !!data.length;
      if(!this.displayFlag) {
        this.formFlag = true;
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
