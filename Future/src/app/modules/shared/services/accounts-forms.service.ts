import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountsForms } from '../models/accounts-forms';

@Injectable({
  providedIn: 'root'
})
export class AccountsFormsService {

  private RestUrl = environment.APIURL;

  list_AccountsForms: AccountsForms[] =[];
  List_AccountsForms_BehaviorSubject:BehaviorSubject<AccountsForms[]> = new BehaviorSubject<AccountsForms[]>([]);

  constructor(private httpClient : HttpClient) { }

  list() :Observable<AccountsForms[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<AccountsForms[]>(this.RestUrl +"C_AccountsForms",options) as Observable<AccountsForms[]>;      
  }

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<AccountsForms[]>(this.RestUrl +"C_AccountsForms",options).subscribe(
      data=>
      {
        this.list_AccountsForms = data;
        this.List_AccountsForms_BehaviorSubject.next(data);
      }
     ) 
    
  }
}
