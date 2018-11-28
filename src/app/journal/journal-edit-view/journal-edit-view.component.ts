import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
          this.journalService.getJournal(this.journalID).subscribe(res => {
            this.journal = res.data;
          });
        });
      }
    });
  }

  create() {
    let user = this.authService.getUserDetails();
    if (user) {
      this.journal.creator = user._id;
      this.journalService.createJournal(this.journal).subscribe(res => {
        if (!res.err)
          this.router.navigateByUrl('/journal/view/' + res.data);
        else
          alert(res.err);
      });
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }

  edit() {
    let user = this.authService.getUserDetails();
    if (user) {
      this.journal.creator = user._id;
      this.journalService.editJournal(this.journal._id, this.journal).subscribe(res => {
        if (!res.err)
          this.router.navigateByUrl('/journal/view/' + res.data);
        else
          alert(res.err);
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
