import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JournalService } from '../journal.service';
import { AuthService } from '../../auth/auth.service';
import { Journal } from '../Journal';

@Component({
  selector: 'app-journal-edit-view',
  templateUrl: './journal-edit-view.component.html',
  styleUrls: ['./journal-edit-view.component.css']
})
export class JournalEditViewComponent implements OnInit {
  journal: Journal;
  journalID: string;
  tag: string;
  mode: string;

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
    this.mode = '';
  }

  create() {
    let user = this.authService.getUserDetails();
    if (user) {
      this.journal.creator = user._id;
      this.journalService.createJournal(this.journal).subscribe(res => {
      });
      this.router.navigateByUrl('/journal/view');
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }

  edit() {
    let user = this.authService.getUserDetails();
    if (user) {
      this.journal.creator = user._id;
      this.journalService.editJournal(this.journal._id, this.journal).subscribe(res => {
      });
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
