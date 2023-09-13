import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable, of, switchMap } from 'rxjs';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SignInComponent } from "../components/sign-in/sign-in.component";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private dialog: MatDialog
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const redirectUrl = state.url === 'sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this._check('/');
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const redirectUrl = state.url === 'sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }
    private _check(redirectURL: string): Observable<boolean> {
        return this._authService.check()
            .pipe(switchMap((_authenticated: boolean) => {

                if (!_authenticated)  {
                   // this._router.navigate(['login'], { queryParams: { redirectURL } });
                   const dialogConfig = new MatDialogConfig();
                   dialogConfig.disableClose = true;
                   dialogConfig.data = {"queryParams":redirectURL};
                   const signInDialog = this.dialog.open(SignInComponent, dialogConfig);
                    return of(false);
                }
                return of(true);

            })
            );
    }
}