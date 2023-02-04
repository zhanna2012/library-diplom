import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MovieModel } from "../../models/movie.model";
import { ApiService } from "../../services/api.service";
import { Subject, switchMap, takeUntil, tap } from "rxjs";

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.scss']
})
export class MoviesDetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }
  destroy$: Subject<boolean> = new Subject<boolean>();


  movie!: MovieModel;
  genres!: string;

  id: number = 0

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$),
      tap(params => this.id = params['id']),
      switchMap(() => this.apiService.getMovieDetails(this.id)),
      tap(data => {
        this.movie = data;
        data.genres.forEach(item => {
          this.genres = this.genres ? this.genres + ', ' + item.name : item.name;
        })
      })
    ).subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
