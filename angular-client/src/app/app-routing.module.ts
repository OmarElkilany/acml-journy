import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { JournalModule } from './journal/journal.module';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthModule
  },
  {
    path: 'journal',
    loadChildren: () => JournalModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
