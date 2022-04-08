import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Injectable } from "@angular/core"
import { tap } from 'rxjs/operators'
import { Router } from '@angular/router'
import { AuthenticationServiceService } from '../service/authentication-service.service'
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public authService: AuthenticationServiceService, public router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.headers.get('noauth'))
            return next.handle(req.clone())
        else {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.authService.getToken())
            });
            return next.handle(clonedreq).pipe(
                tap(
                    event => { },
                    err => {
                        if (err.error.auth == false) {
                            this.router.navigateByUrl('authentification')
                        }

                    }
                )
            )
        }

    }
}