import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { DisqusModule, DISQUS_SHORTNAME } from "ngx-disqus";

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
      useValue: 'test-aggnui5c7a'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
