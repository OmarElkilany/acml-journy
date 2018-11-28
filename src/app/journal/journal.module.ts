import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalRoutingModule } from './journal-routing.module';
import { JournalService } from './journal.service';
import { SearchComponent } from './search/search.component';
import { JournalViewComponent } from './journal-view/journal-view.component';
import { JournalEditViewComponent } from './journal-edit-view/journal-edit-view.component';
import { AuthService } from '../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'
import { DisqusModule } from "ngx-disqus";
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatChipsModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  declarations: [JournalViewComponent, JournalEditViewComponent, SearchComponent],
  imports: [
    CommonModule,
    JournalRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    QuillModule,
    DisqusModule
  ],
  providers: [JournalService, AuthService]
})
export class JournalModule { }
