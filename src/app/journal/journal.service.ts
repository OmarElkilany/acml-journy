import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { Router } from '@angular/router';
import { Journal } from './Journal';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  serverBaseURL = process.env.BACKEND_URI;

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
}
