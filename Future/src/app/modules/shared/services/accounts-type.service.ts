import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountsType } from '../models/accounts-type';

@Injectable({
  providedIn: 'root'
})
export class AccountsTypeService {

  private RestUrl = environment.APIURL;

  list_AccountsType: AccountsType[] =[];
  List_AccountsType_BehaviorSubject:BehaviorSubject<AccountsType[]> = new BehaviorSubject<AccountsType[]>([]);

  constructor(private httpClient : HttpClient) { }

  list() :Observable<AccountsType[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<AccountsType[]>(this.RestUrl +"C_AccountsType",options) as Observable<AccountsType[]>;      
  }

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<AccountsType[]>(this.RestUrl +"C_AccountsType",options).subscribe(
      data=>
      {
        this.list_AccountsType = data;
        this.List_AccountsType_BehaviorSubject.next(data);
      }
     ) 
    
  }
}
