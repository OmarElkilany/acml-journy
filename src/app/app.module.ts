import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { DisqusModule, DISQUS_SHORTNAME } from "ngx-disqus";
import { environment } from '../environments/environment.prod';

import {
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatButtonModule
} from '@angular/material/';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      maxOpened: 3
    }),
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    DisqusModule
  ],
  providers: [
    AuthService,
    {
      provide: DISQUS_SHORTNAME,
      useValue: environment.DISQUS_SHORTNAME
    },
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
