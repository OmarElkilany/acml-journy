import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalViewComponent } from './journal-view/journal-view.component';
import { JournalEditViewComponent } from './journal-edit-view/journal-edit-view.component';

const routes: Routes = [
  {
    path: 'view',
    component: JournalViewComponent
  },
  {
    path: 'edit',
    component: JournalEditViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule { }
