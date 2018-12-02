import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JournalService } from '../journal.service';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
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

  // Text Editor - Quill
  modules: object = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', 'normal', 'large', 'huge'] }],  // custom dropdown

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link']                         // link and image, video
    ]
  };

  constructor(
    private journalService: JournalService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.toastrService.warning('You appear to not be logged in, let\'s fix that');
      this.router.navigateByUrl('/auth/login');
    }

    this.journal = {
      title: '',
      creator: '',
      body: '',
      tags: []
    }

    this.journalID = '';
    this.tag = '';
    this.mode = '';

    // fetch routing data
    this.route.url.subscribe(url => {
      this.mode = url[0].path;
      if (this.mode === 'edit') {
        this.route.params.subscribe(params => {
          this.journalID = params.journalID;
          // fetch journal
          this.journalService.getJournal(this.journalID).subscribe(
            res => {
              this.journal = res.data;
            },
            err => {
              this.toastrService.error(err.error.err);
              this.router.navigateByUrl('/journal/create');
            });
        });
      }
    });
  }

  create() {
    if (this.authService.isLoggedIn()) {
      if (!this.journal.title)
        this.toastrService.warning('Please enter a title for your journal');
      else if (!this.journal.body)
        this.toastrService.warning('Please write something in your journal');
      else if (!this.journal.tags.length)
        this.toastrService.warning('Please enter at least one tag for your journal');
      else {
        let user = this.authService.getUserDetails();
        this.journal.creator = user._id;

        this.journalService.createJournal(this.journal).subscribe(
          res => {
            this.toastrService.success(res.msg);
            this.router.navigateByUrl('/journal/view/' + res.data);
          },
          err => {
            this.toastrService.error(err.error.err);
          });
      }
    } else {
      this.toastrService.warning('You appear to not be logged in, let\'s fix that');
      this.router.navigateByUrl('/auth/login');
    }
  }

  edit() {
    if (this.authService.isLoggedIn()) {
      let user = this.authService.getUserDetails();
      this.journal.creator = user._id;
      this.journalService.editJournal(this.journal._id, this.journal).subscribe(
        res => {
          this.toastrService.success(res.msg);
          this.router.navigateByUrl('/journal/view/' + res.data);
        },
        err => {
          this.toastrService.error(err.error.err);
        });
    } else {
      this.toastrService.warning('You appear to not be logged in, let\'s fix that');
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
