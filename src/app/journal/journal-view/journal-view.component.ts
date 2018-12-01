import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JournalService } from '../journal.service';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
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
    private toastrService: ToastrService,
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
      this.journalService.getJournal(params.journalID).subscribe(
        res => {
          this.journal = res.data;

          let user;

          if (this.authService.isLoggedIn())
            user = this.authService.getUserDetails();

          if (user && user._id === this.journal.creator)
            this.owner = true;
        },
        err => {
          this.toastrService.error(err.error.err);
          this.router.navigateByUrl('/journal/create');
        });
    });
  }

  delete() {
    if (this.authService.isLoggedIn()) {
      let user = this.authService.getUserDetails();
      this.journalService.deleteJournal(this.journal._id, user._id).subscribe(
        res => {
          this.toastrService.success(res.msg);
          this.router.navigateByUrl('/journal/create');
        },
        err => {
          this.toastrService.error(err.error.err);
          this.router.navigateByUrl('/journal/create');
        });
    } else {
      this.toastrService.warning('You appear to not be logged in, let\'s fix that');
      this.router.navigateByUrl('/auth/login');
    }
  }

  edit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/journal/edit/' + this.journal._id);
    } else {
      this.toastrService.warning('You appear to not be logged in, let\'s fix that');
      this.router.navigateByUrl('/auth/login');
    }
  }

  addTag(addedTag: string, targetJournal: Journal) {
    if (this.journal.tags.indexOf(addedTag) === -1)
      targetJournal.tags.push(addedTag);
  }

  removeTag(removedTag: string, targetJournal: Journal) {
    let removedIndex = targetJournal.tags.indexOf(removedTag);
    targetJournal.tags.splice(removedIndex, 1);
  }

}
