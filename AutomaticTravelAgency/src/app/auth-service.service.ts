import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { pipe, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http:HttpClient , private router:Router) { }

  login(username:string , password:string){
    return this.http.post<any>(`${this.apiUrl}/users`,{username,password})
    .pipe(
      tap((res: any) => {
        console.log('Response:', res);  // Log the response
        // Access token using res.token.value
        localStorage.setItem('token', res.token.value);  // Store the token
      }),
      catchError((error) => {
        console.error('Error occurred:', error);  // Log the error
        return throwError(error);  // Rethrow the error
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getUserRole() {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token if it's a JWT and extract the user's role
      // Example: assuming token is a simple object stored as JSON
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode base64 payload from JWT
      return payload.role; // Return the user's role (e.g., 'admin' or 'customer')
    }
    return null;
  }
}
