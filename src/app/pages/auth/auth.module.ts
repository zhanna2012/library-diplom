import { NgModule } from '@angular/core';
import { ApiService } from "../../shared/services/api.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { MatInputModule }  from '@angular/material/input';
import { FormsModule } from "@angular/forms";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JsonServerService } from "../../shared/services/json-server.service";
import { AuthRoutingModule } from "./auth-routing.module";
import { LogInComponent } from './log-in/log-in.component';
import { ContentModule } from "../content/content.module";
import { SnackBarService } from "../../shared/services/snackbar.service";
import { ErrorHandlingInterceptor } from "../../core/interceptors/error-handling.interceptor";


@NgModule({
  declarations: [
    LogInComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    AuthRoutingModule,
    ContentModule
  ],
  providers: [
    ApiService,
    JsonServerService,
    SnackBarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true,
    }
  ],
  bootstrap: []
})
export class AuthModule { }
