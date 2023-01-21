import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient , private _Router:Router) {
    if(localStorage.getItem("userToken") != null){
      this.saveUserData();
    }
   }
  
  userData = new BehaviorSubject(null);

  saveUserData(){
    let codedUserData = JSON.stringify(localStorage.getItem("userToken"));
    try {
      this.userData.next(jwtDecode(codedUserData));
      this._Router.navigate(["/login"])
    } catch (error) {
      localStorage.removeItem("userToken");
      this._Router.navigate(["/login"]);
    }
  }

  register(formData:object):Observable<any>
  {
    return this._HttpClient.post(`https://route-egypt-api.herokuapp.com/signup`,formData)
  }

  login(formData:object):Observable<any>
  {
    return this._HttpClient.post(`https://route-egypt-api.herokuapp.com/signin`,formData)
  }

  logOut(token:object):Observable<any>{
    this.userData.next(null);
    return this._HttpClient.post("https://route-egypt-api.herokuapp.com/signout",token);
  }
}


