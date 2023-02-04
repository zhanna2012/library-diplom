import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MovieModel } from "../../models/movie.model";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ApproveDialogComponent } from "../approve-dialog/approve-dialog.component";
import { JsonServerService } from "../../services/json-server.service";
import { SnackBarService } from '../../services/snackbar.service';
import { Subject, takeUntil } from "rxjs";
import {BooksModel} from "../../models/books.model";


@Component({
  selector: 'book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() book!: BooksModel;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
