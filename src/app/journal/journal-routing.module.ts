import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalViewComponent } from './journal-view/journal-view.component';
import { JournalEditViewComponent } from './journal-edit-view/journal-edit-view.component';
import { JournalListView } from './journal-list-view/journal-list-view.component';

const routes: Routes = [
  {
    path: 'view/:journalID',
    component: JournalViewComponent
  },
  {
    path: 'edit/:journalID',
    component: JournalEditViewComponent
  },
  {
    path: 'create',
    component: JournalEditViewComponent
  },
  {
    path: 'list',
    component: JournalListView
  },
  {
    path: 'list/:tag',
    component: JournalListView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule { }
