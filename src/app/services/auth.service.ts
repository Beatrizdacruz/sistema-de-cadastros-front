// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated: boolean = false;

  constructor(private router: Router) { }
  private username: string | null= null;

  isLoggedIn(): boolean {
    console.log(this.authenticated)
    return this.authenticated;
  }

  logout(): void {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
    this.authenticated = false;
    this.router.navigate(['/login']);
  }

  getUsername(){
    return sessionStorage.getItem("username")
  }
  setUsername(username: string){
    this.username = username;
  }
}
