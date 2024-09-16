import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservice:AuthServiceService , private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
     const userRole=this.authservice.getUserRole();

     if(!this.authservice.isLoggedIn()){
      this.router.navigate(['/login']);
      return false;
     }

     if(route.data['role'] && route.data['role']!==userRole){
      this.router.navigate(['/unauthorized']);
      return false;
     }
    return true;
  }
  
}
