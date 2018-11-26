import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalRoutingModule } from './journal-routing.module';
import { JournalViewComponent } from './journal-view/journal-view.component';
import { JournalService } from './journal.service';
import { AuthService } from '../auth/auth.service';
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatChipsModule,
  MatIconModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { JournalEditViewComponent } from './journal-edit-view/journal-edit-view.component';

@NgModule({
  declarations: [JournalViewComponent, JournalEditViewComponent],
  imports: [
    CommonModule,
    JournalRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    FormsModule
  ],
  providers: [JournalService, AuthService]
})
export class JournalModule { }
