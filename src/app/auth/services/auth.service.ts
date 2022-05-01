import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../interfaces/login-response.interface';
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL: string = environment.URL;

  constructor(private http: HttpClient) { }

  login(user: Login) {
    if(user.rememberPassword){
      this.setCredentialsData(user);
    }else{
      this.deleteCredentialsData();
    }

    const userPartial: Partial<Login> = {
      email: user.email,
      password: user.password
    }

    return this.http.post<LoginResponse>(`${this.URL}user/login`, userPartial).pipe(
      tap( user => {
        if(user.token){
          localStorage.setItem('token', user.token);
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
  }

  getCredentialsData(): Login | null {
    const credentials: Login = JSON.parse(localStorage.getItem('credentials')!);
    if (credentials) {
      return credentials;
    }
    return null;
  }

  setCredentialsData(user: Login): void {
    localStorage.setItem('credentials', JSON.stringify(user));
  }

  deleteCredentialsData(): void{
    localStorage.removeItem('credentials');
  }
}
