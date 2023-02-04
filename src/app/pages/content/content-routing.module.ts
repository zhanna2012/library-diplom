import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { MoviesComponent } from "./movies/movies.component";
import { TvComponent } from "./tv/tv.component";
import { MoviesDetailsComponent } from "../../shared/custom-components/movies-details/movies-details.component";
import { TvDetailsComponent } from "../../shared/custom-components/tv-details/tv-details.component";
import { SuggestComponent } from "./suggest/suggest.component";
import { AuthGuardService } from "../../shared/services/auth-guard.service";


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:id', component: MoviesDetailsComponent },
  { path: 'tv', component: TvComponent },
  { path: 'tv/:id', component: TvDetailsComponent },
  { path: 'suggest', component: SuggestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
