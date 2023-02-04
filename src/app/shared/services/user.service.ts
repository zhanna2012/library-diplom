import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable, tap } from "rxjs";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getToken(): any {
    return localStorage.getItem('token');
  }

  removeToken(): any {
    localStorage.removeItem('token');
  }

  logIn(email: string, password: string): Observable<string> {
    return this.http.get<UserModel[]>('http://localhost:3000/users').pipe(
      map(users => {
        return users.find((user: UserModel) => user.email === email && user.userPassword === password) ?? {
          email: '',
          userPassword: '',
          role: ''
        };
      }),
      map(user => {
        localStorage.setItem('token', user.role)
        return user.role;
      }),
    );
  }
}
