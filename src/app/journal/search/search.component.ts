import { Component, OnInit } from '@angular/core';
import { JournalService } from '../journal.service';
import { AuthService } from '../../auth/auth.service';
import { Journal } from '../Journal';
import {PageEvent} from '@angular/material';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  tags: string[];
  title: string;
  creator: string;
  my_id: string;
  viewMine: boolean;
  journals: Journal[];
  tag: string;
  page = 1;
  pageLimit = 5;
  pageSizeOptions = [1, 5, 10, 20];
  totalNumberOfPages: Number;
  pageSelect = [];


  constructor(private journalService: JournalService, private authService: AuthService) { }

  ngOnInit() {
    this.tags = [];
    this.journals = [];
    this.title = '';
    this.creator = '';
    this.viewMine = false;
    this.tag = '';
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  addTag(addedTag: string) {
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
        if (!this.my_id) {
          this.my_id = this.authService.getUserDetails()._id;
        }
        if (this.my_id) {
          this.search(undefined, undefined, this.my_id);
        } else {
          //TODO: getUserDetails returned no email
        }
      }
    }
    else {
      //TODO: Not logged in, do something (Toastr and redirect to login)
    }
  }

  search(title?: string, creator?: string, my_id?: string) {
    this.journalService.searchJournals(this.page, this.pageLimit, title, creator, this.tags, my_id).subscribe(res => {
      if (res.err) {
        //TODO: Handle error
      }
      console.log(res);
      this.totalNumberOfPages = Math.ceil(res.data.total / res.data.pageLimit);
      this.journals = res.data.docs;
      this.setupPageSelect(res.data.page);
    });
  }

  setupPageSelect(page: number) {
    this.pageSelect.splice(0, this.pageSelect.length);
    for (let i = 0; i < this.totalNumberOfPages; i++) {
      this.pageSelect.push(page + i);      
    }
  }
}
