import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalViewComponent } from './journal-view/journal-view.component';

const routes: Routes = [
  {
    path: 'view',
    component: JournalViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule { }
