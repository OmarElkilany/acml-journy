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

  createdJournal: Journal;
  retrievedJournal: Journal;
  retrievedJournalID: string;
  tagCreate: string;
  tagEdit: string;


  constructor(private journalService: JournalService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.createdJournal = {
      title: '',
      creator: '',
      body: '',
      tags: []
    }
    this.retrievedJournal = {
      title: '',
      creator: '',
      body: '',
      tags: []
    }

    this.retrievedJournalID = '';

    this.tagCreate = '';
    this.tagEdit = '';
  }

  create() {
    let user = this.authService.getUserDetails();
    if (user) {
      this.createdJournal.creator = user._id;
      this.journalService.createJournal(this.createdJournal).subscribe(res => {
      });
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }

  retrieve() {
    this.journalService.getJournal(this.retrievedJournalID).subscribe(res => {
      this.retrievedJournal = res.data;
    });
  }

  edit() {
    let user = this.authService.getUserDetails();
    if (user) {
      this.retrievedJournal.creator = user._id;
      this.journalService.editJournal(this.retrievedJournal._id, this.retrievedJournal).subscribe(res => {
      });
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }

  delete() {
    let user = this.authService.getUserDetails();
    if (user) {
      this.journalService.deleteJournal(this.retrievedJournal._id, user._id).subscribe(res => {
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
