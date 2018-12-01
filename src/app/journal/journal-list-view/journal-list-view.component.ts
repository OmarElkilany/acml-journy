import { Component, OnInit } from '@angular/core';
import { JournalService } from '../journal.service';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Journal } from '../Journal';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-journal-list-view',
  templateUrl: './journal-list-view.component.html',
  styleUrls: ['./journal-list-view.component.css']
})
export class JournalListView implements OnInit {
  tags: string[];
  title: string;
  creator: string;
  my_id: string;
  viewMine: boolean;
  journals: Journal[];
  tag: string;
  page = 1;
  pageLimit = 6;
  pageSizeOptions = [3, 6, 9, 12];
  totalNumberOfPages: Number;
  journalCount = 0;
  pageSelect = [];
  isLoggedIn: boolean;


  constructor(
    private journalService: JournalService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.tags = [];
    this.journals = [];
    this.title = '';
    this.creator = '';
    this.viewMine = false;
    this.tag = '';
    this.isLoggedIn = this.authService.isLoggedIn();
    this.activatedRoute.params.subscribe(params => {
      if (params.tag) {
        this.tags.push(params.tag);
        this.search();
      }
    })
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  addTag(addedTag: string) {
    if (addedTag && this.tags.indexOf(addedTag) === -1)
      this.tags.push(addedTag);
  }

  removeTag(removedTag: string) {
    let removedIndex = this.tags.indexOf(removedTag);
    this.tags.splice(removedIndex, 1);
  }

  toggleView() {
    if (this.authService.isLoggedIn()) {
      this.page = 1;
      this.viewMine = !this.viewMine;
      this.journals = [];
      if (this.viewMine) {
        if (!this.my_id)
          this.my_id = this.authService.getUserDetails()._id;

        this.tags = [];
        this.title = '';
        this.creator = '';

        this.search(undefined, undefined, this.my_id);
      }
    }
    else {
      this.toastrService.warning('You appear to not be logged in, let\'s fix that');
      this.router.navigateByUrl('/auth/login');
    }
  }

  search(title?: string, creator?: string, my_id?: string) {
    this.journals = [];
    this.journalService.searchJournals(this.page, this.pageLimit, title, creator, this.tags, my_id).subscribe(
      res => {
        this.journalCount = res.data.total;
        this.totalNumberOfPages = Math.ceil(res.data.total / res.data.pageLimit);
        this.journals = res.data.docs;
        this.setupPageSelect(res.data.page);
      },
      err => {
        this.toastrService.error(err.error.err);
        this.router.navigateByUrl('/journal/create');
      });
  }

  paginatorUpdate(event: any) {
    this.page = event.pageIndex + 1;
    this.pageLimit = event.pageSize;
  }

  setupPageSelect(page: number) {
    this.pageSelect.splice(0, this.pageSelect.length);
    for (let i = 0; i < this.totalNumberOfPages; i++) {
      this.pageSelect.push(page + i);
    }
  }
}
