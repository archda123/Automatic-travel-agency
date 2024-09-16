import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthServiceService, private router: Router) { }

  onLogin(){
  this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Handle successful login, perhaps navigate to a dashboard or admin page
        console.log('Login successful', response);
        if (response.role == 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/customer']);
        }
      },
      error: (err) => {
        // Handle login error, like showing a message
        console.error('Login failed', err);
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}
