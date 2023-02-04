import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ContentRoutingModule } from "./content-routing.module";
import { CardComponent } from "../../shared/custom-components/card/card.component";
import { ApiService } from "../../shared/services/api.service";
import { ApiKeyInterceptor } from "../../core/interceptors/api-key.interceptor";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { SearchInputComponent } from "../../shared/custom-components/search-input/search-input.component";
import { MatInputModule }  from '@angular/material/input';
import { FormsModule } from "@angular/forms";
import { SearchPipe } from "../../shared/search-pipes/search.pipe";
import { MoviesComponent } from './movies/movies.component';
import { TvComponent } from './tv/tv.component';
import { SuggestComponent } from './suggest/suggest.component';
import { ButtonComponent } from "../../shared/custom-components/button/button.component";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JsonServerService } from "../../shared/services/json-server.service";
import { HeaderComponent } from "../../shared/custom-components/header/header.component";
import { NavbarComponent } from "../../shared/custom-components/navbar/navbar.component";
import { SnackBarService } from "../../shared/services/snackbar.service";
import { SearchService } from "../../shared/services/search.service";
import { ErrorHandlingInterceptor } from "../../core/interceptors/error-handling.interceptor";
import { BookCardComponent } from "../../shared/custom-components/book-card/book-card.component";

@NgModule({
    declarations: [
        HomeComponent,
        CardComponent,
        SearchInputComponent,
        SearchPipe,
        MoviesComponent,
        TvComponent,
        SuggestComponent,
        ButtonComponent,
        HeaderComponent,
        NavbarComponent,
        BookCardComponent
    ],
    imports: [
        ContentRoutingModule,
        CommonModule,
        HttpClientModule,
        MatInputModule,
        FormsModule,
        MatSnackBarModule,
    ],
    providers: [
      ApiService,
      JsonServerService,
      SnackBarService,
      SearchService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiKeyInterceptor,
        multi: true,
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorHandlingInterceptor,
        multi: true,
      }
    ],
  exports: [
    SearchInputComponent,
    ButtonComponent,
    HeaderComponent,
    NavbarComponent,
    CardComponent,
    BookCardComponent
  ],
    bootstrap: []
})
export class ContentModule { }
