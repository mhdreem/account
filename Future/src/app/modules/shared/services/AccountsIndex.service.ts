import { Injectable } from '@angular/core';
import { AccountsIndex } from '../models/AccountsIndex';
import { HttpHeaders, HttpClient, HttpParamsOptions } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsIndexService {

  private RestUrl = environment.APIURL;

  constructor(private httpClient : HttpClient) { }

  BuildTree() :Observable<AccountsIndex> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<AccountsIndex>(this.RestUrl +"AccountsIndex/BuildTree",options) as Observable<AccountsIndex>;      
  }

  list() :Observable<AccountsIndex[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<AccountsIndex[]>(this.RestUrl +"AccountsIndex/List",options) as Observable<AccountsIndex[]>;      
  }


  add(request: AccountsIndex){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.post(this.RestUrl +"AccountsIndex",request,options);      
  }

  update(request: AccountsIndex){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.put(this.RestUrl +"AccountsIndex",request,options);      
  }

  getbycode(code: number):Observable<AccountsIndex>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<AccountsIndex>(this.RestUrl +"AccountsIndex/GetByCode/"+code,options) as Observable<AccountsIndex>;      
  }

  delete(id: number){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.delete(this.RestUrl +"AccountsIndex/Delete/"+id,options);
  }
}
