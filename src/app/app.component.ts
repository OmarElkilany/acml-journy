import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('snav') private element: MatSidenav;

  title = 'Journy';
  name = '';
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(public authService: AuthService, private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  goToRegister(): void {;
    this.router.navigate(['/auth/register']);
    this.element.toggle();
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
    this.element.toggle();
  }

  goToJournalCreation(): void {
    this.router.navigate(['/journal/create']);
    this.element.toggle();
  }

  goToJournalSearch(): void {
    this.router.navigate(['/journal/list']);
    this.element.toggle();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.element.toggle();
  }

}
