import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Login } from '../models/login';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API: string = 'http://localhost:8080/api/login';
  http = inject(HttpClient);

  constructor() { }


  logar(login: Login): Observable<User> {
    return this.http.post<User>(this.API, login);
  }

  deslogar(): Observable<any> {
    return this.http.get<any>(this.API+'/deslogar');
  }

  addToken(token: string){
    localStorage.setItem('token', token);
  }

  removerToken(){
    localStorage.removeItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  hasPermission(){
    let token: any;
    token = localStorage.getItem('token')
    const  decodificado  =  jwtDecode < JwtPayload > ( token ) as User ;  //Retorna com o tipo JwtPayload
    if(decodificado.role.includes("ADMIN")){
      return true
    }else{
      return false
    }
}


}
