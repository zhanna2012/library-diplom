import { BehaviorSubject, Observable } from "rxjs";
import { MovieModel } from "../models/movie.model";
import { ApiService } from "../services/api.service";
import { BooksModel } from "../models/books.model";

export abstract class ApiPageAbstract {
  public gridData!: Observable<MovieModel[]>;
  public gridDataBooks!: Observable<BooksModel[]>;
  public gridDataCount: number = 0;
  public hasChanges$ = new BehaviorSubject(true);
  public searchValue: string = '';
  public titleCount: string = 'All';
  getSearchValue(value: string): void {
    this.searchValue = value
  };
  protected constructor(public apiService: ApiService) { }

}
