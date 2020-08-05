import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {of} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor() {
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return of(true);
    }
}
