import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { Router } from '@angular/router';
import { Journal } from './Journal';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class JournalService {

  serverBaseURL = environment.BACKEND_URI;

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getJournal(journalID: string): Observable<any> {
    return this.httpClient.get(this.serverBaseURL + 'journal/getJournal/' + journalID);
  }

  public createJournal(journal: Journal): Observable<any> {
    return this.httpClient.post(this.serverBaseURL + 'journal/createJournal', journal);
  }

  public editJournal(journalID: string, journal: Journal): Observable<any> {
    return this.httpClient.patch(this.serverBaseURL + 'journal/editJournal/' + journalID, journal);
  }

  public deleteJournal(journalID: string, user: string): Observable<any> {
    return this.httpClient.delete(this.serverBaseURL + 'journal/deleteJournal/' + journalID + '/' + user);
  }

  public searchJournals(page: number, pageLimit: number, title?: string, creator?: string, tags?: string[], user_id?: string): Observable<any> {
    return this.httpClient.post(this.serverBaseURL + 'journal/search', { page, pageLimit, title, creator, tags, user_id });
  }
}
