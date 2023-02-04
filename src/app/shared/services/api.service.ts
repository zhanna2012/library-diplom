import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, pluck } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ApiResponseModel } from "../models/api-response.model";
import { MovieModel } from "../models/movie.model";
import {BooksModel, BooksModelApi} from "../models/books.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "https://api.themoviedb.org";

  private baseUrlBooks = 'https://www.googleapis.com/books/v1/volumes?q=time&maxResults=40&printType=all&key=AIzaSyBKbqRhuwEeQ2RxsBUyD7UxOPeTJZEgZPU'

  constructor(private http: HttpClient) { }


  getAllBooks(): Observable<BooksModel[]> {
    return this.http.get<BooksModelApi>(`${this.baseUrlBooks}`).pipe(
      pluck('items')
    );
  }


  getAll(): Observable<MovieModel[]> {
    return forkJoin({
      movies: this.getMovies(),
      tvShows: this.getTVShows()
    }).pipe(
      map(data => {
        return [ ...data.movies, ...data.tvShows]
      })
    )
  }

  getMovies(): Observable<MovieModel[]> {
    return forkJoin({
      popular: this.http.get<ApiResponseModel>(`${this.baseUrl}/3/movie/popular?language=en-US`).pipe( pluck('results')),
      top_rated: this.http.get<ApiResponseModel>(`${this.baseUrl}/3/movie/top_rated?language=en-US`).pipe( pluck('results')),
      upcoming: this.http.get<ApiResponseModel>(`${this.baseUrl}/3/movie/upcoming?language=en-US`).pipe( pluck('results')),
    }).pipe(
      map(data => {
        return [ ...data.top_rated,  ...data.popular, ...data.upcoming]
      }),
      map(data => {
        return data.map(item => {
          return { ...item, isMovie: true}
        })
      })
    )
  }

  getMoviesCount(): Observable<number> {
    return this.getMovies().pipe(
      map(data => {
        return data.length;
      })
    )
  }

  getTvCount(): Observable<number> {
    return this.getTVShows().pipe(
      map(data => {
        return data.length;
      })
    )
  }


  getTVShows(): Observable<MovieModel[]> {
    return forkJoin({
      popular: this.http.get<ApiResponseModel>(`${this.baseUrl}/3/tv/popular?language=en-US`).pipe( pluck('results')),
      top_rated: this.http.get<ApiResponseModel>(`${this.baseUrl}/3/tv/top_rated?language=en-US`).pipe( pluck('results')),
    }).pipe(
      map(data => {
        return [ ...data.top_rated,  ...data.popular ]
      }),
      map(data => {
        return data.map(item => {
          return { ...item, isMovie: false}
        })
      })
    )
  }

  getMovieDetails(id: number): Observable<MovieModel> {
    return this.http.get<MovieModel>(`${this.baseUrl}/3/movie/${id}?language=en-US`);
  }

  getTvDetails(id: number): Observable<MovieModel> {
    return this.http.get<MovieModel>(`${this.baseUrl}/3/tv/${id}?language=en-US`);
  }


}
