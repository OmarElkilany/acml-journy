import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  tag: string;
  owner: boolean;

  constructor(
    private journalService: JournalService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.journal = {
      title: '',
      creator: '',
      body: '',
      tags: []
    }

    this.tag = '';
    this.owner = false;

    // fetch routing data
    this.route.params.subscribe(params => {
      // fetch journal
      this.journalService.getJournal(params.journalID).subscribe(res => {
        this.journal = res.data;
        let user = this.authService.getUserDetails();
        if (user._id === this.journal.creator)
          this.owner = true;
      });
    });
  }

  delete() {
    let user = this.authService.getUserDetails();
    if (user) {
      this.journalService.deleteJournal(this.journal._id, user._id).subscribe(res => {
        if (!res.err)
          this.router.navigateByUrl('/journal/create');
      });
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }

  edit() {
    let user = this.authService.getUserDetails();
    if (user) {
      this.router.navigateByUrl('/journal/edit/' + this.journal._id);
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
