import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JournalService } from '../journal.service';
import { AuthService } from '../../auth/auth.service';
import { Journal } from '../Journal';

@Component({
  selector: 'app-journal-view',
  templateUrl: './journal-view.component.html',
  styleUrls: ['./journal-view.component.css']
})
export class JournalViewComponent implements OnInit {

  journal: Journal;

  constructor(private journalService: JournalService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  create() {
    console.log(this.authService.isLoggedIn);
    if (this.authService.isLoggedIn) {
      this.journalService.createJournal(this.journal).subscribe(() => {
        console.log('It has been done, master...')
      }, (err) => {
        console.log(err);
      });
    } else
      this.router.navigateByUrl('/auth/login');
  }

}
