import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { MovieModel } from "../../models/movie.model";
import { switchMap, tap } from "rxjs";

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.scss']
})
export class TvDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  movie!: MovieModel;
  genres!: string;

  id: number = 0

  ngOnInit(): void {
    this.route.params.pipe(
      tap(params => this.id = params['id']),
      switchMap(() => this.apiService.getTvDetails(this.id)),
      tap(data => {
        this.movie = data;
        data.genres.forEach(item => {
          this.genres = this.genres ? this.genres + ', ' + item.name : item.name;
        })
      })
    ).subscribe()
  }

}
