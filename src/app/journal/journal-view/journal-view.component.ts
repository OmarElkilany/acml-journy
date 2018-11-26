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
  journalID: string;
  tag: string;

  constructor(private journalService: JournalService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.journal = {
      title: '',
      creator: '',
      body: '',
      tags: []
    }

    this.journalID = '';
    this.tag = '';
  }

  retrieve() {
    this.journalService.getJournal(this.journalID).subscribe(res => {
      this.journal = res.data;
    });
  }

  delete() {
    let user = this.authService.getUserDetails();
    if (user) {
      this.journalService.deleteJournal(this.journal._id, user._id).subscribe(res => {
      });
      this.router.navigateByUrl('/journal/edit');
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }

  edit() {
    let user = this.authService.getUserDetails();
    if (user) {
      this.router.navigateByUrl('/journal/edit/' + this.journalID);
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }

  addTag(addedTag: string, targetJournal: Journal) {
    targetJournal.tags.push(addedTag);
  }

  removeTag(removedTag: string, targetJournal: Journal) {
    let removedIndex = targetJournal.tags.indexOf(removedTag);
    targetJournal.tags.splice(removedIndex, 1);
  }

}
