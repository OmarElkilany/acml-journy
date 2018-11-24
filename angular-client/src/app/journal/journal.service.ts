import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { Router } from '@angular/router';
import { Journal } from './Journal';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  serverBaseURL = 'http://localhost:3000/'; // TODO: change to environment or config

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getJournal(journalID: string): Observable<any> {
    console.log('Entered service get journal');
    console.log(journalID);
    return this.httpClient.get(this.serverBaseURL + 'journal/createJournal/' + journalID);
  }

  public createJournal(journal: Journal): Observable<any> {
    console.log('Entered service create journal');
    console.log(journal);
    return this.httpClient.post(this.serverBaseURL + 'journal/createJournal', journal);
  }

  public editJournal(journalID: string, journal: Journal): Observable<any> {
    console.log('Entered service edit journal');
    console.log(journalID);
    console.log(journal);
    return this.httpClient.patch(this.serverBaseURL + 'journal/createJournal/' + journalID, journal);
  }

  public deleteJournal(journalID: string): Observable<any> {
    console.log('Entered service delete journal');
    console.log(journalID);
    return this.httpClient.delete(this.serverBaseURL + 'journal/createJournal/' + journalID);
  }
}
