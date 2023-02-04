import { MovieModel } from "./movie.model";

export interface ApiResponseModel {
  page: number,
  results: MovieModel[],
  total_results: number,
  total_pages: number
}
