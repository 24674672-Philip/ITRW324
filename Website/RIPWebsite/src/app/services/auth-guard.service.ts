// import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
// import {Injectable} from '@angular/core';
// import {AuthService} from './auth.service';

// @Injectable()
// export class AuthGuard implements CanActivate{
//     constructor(private authService: AuthService, private router: Router){}
//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
//         if(this.authService.isAuthenticated() == false)
//         {
//             this.router.navigate(['error403']);
//         }
//         return this.authService.isAuthenticated();
//     }
// }