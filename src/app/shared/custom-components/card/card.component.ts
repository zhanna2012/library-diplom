import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MovieModel } from "../../models/movie.model";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ApproveDialogComponent } from "../approve-dialog/approve-dialog.component";
import { JsonServerService } from "../../services/json-server.service";
import { SnackBarService } from '../../services/snackbar.service';
import { Subject, takeUntil } from "rxjs";


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() movie!: MovieModel;


  suggestFlag: boolean = false;
  suggestedFlag: boolean = false;

  addFlag: boolean = false;
  addedFlag: boolean = false;

  getDetails(id: number, isMovie: boolean) {
    if(isMovie) {
      this.router.navigate(['/movies', id]);
    } else {
      this.router.navigate(['/tv', id]);
    }
  }

  suggested() {
    this.jsonServer.addMovie(this.movie)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
      () => {
        const dialogRef = this.dialog.open(ApproveDialogComponent, {
          maxWidth: '560px',
        });
        dialogRef.afterClosed().subscribe(() => {
          this.suggestedFlag = true;
        })
      },
      () => {
        this.snackBService.openSnackBar('Something went wrong', 'Ok')
      },
    );
  }

  added() {
    this.jsonServer.addToList(this.movie)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
      () => {
        this.snackBService.openSnackBar('The movie is added to your list!', 'Ok');
        this.addedFlag = true;
      },
      () => {
        this.snackBService.openSnackBar('Something went wrong', 'Ok')
      },
    );
  }


  constructor(private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private jsonServer: JsonServerService,
              private snackBService: SnackBarService) { }

  ngOnInit(): void {
    this.route.url
      .pipe(takeUntil(this.destroy$))
      .subscribe(url => {
      if(url[0].path) {
        this.suggestFlag = url[0].path === 'suggest';
        this.addFlag = url[0].path === 'add-item' || url[0].path === 'suggestions'
      }
    })
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
