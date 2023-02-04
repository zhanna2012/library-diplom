import { Injectable } from '@angular/core';
import { map, Observable, pluck } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ApiResponseModel } from "../models/api-response.model";
import { MovieModel } from "../models/movie.model";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = "https://api.themoviedb.org";

  constructor(private http: HttpClient) { }


  getSearchValues(value: string): Observable<MovieModel[]> {
    return this.http.get<ApiResponseModel>(`${this.baseUrl}/3/search/multi?language=en-US&adult=false&query=${value}`).pipe(
      pluck('results'),
      map(data => {
        return data.filter(item => item.media_type === 'movie' || item.media_type === 'tv')
      }),
      map(data => {
        return data.map(item => {
          return { ...item, isMovie: item.media_type === 'movie'}
        })
      })
    )
  }

}
