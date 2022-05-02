import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorAuthService implements HttpInterceptor {

  constructor(private router: Router, private loadingService: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();
    let reqClone: HttpRequest<any>;
    const jwToken:string = localStorage.getItem('token')!;

    if(!jwToken){
      reqClone = req.clone({
      });
    }else{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${jwToken}`
      });
      reqClone = req.clone({
        headers
      });
    }

    return next.handle( reqClone ).pipe(
      tap({
        error: (res) => {
          if(res.error.statusCode == 401){
            this.router.navigate(['auth']);
            localStorage.removeItem('token');
            Swal.fire({
              icon: 'info',
              text: 'No tienes permisos para hacer esto o tu sesión caducó. :O',
              showConfirmButton: false,
              timer: 3000
            })
          }
        }
      }),
      finalize(() => this.loadingService.hide()),
      catchError(this.errorResponse),
      );
  }

  errorResponse(error: HttpErrorResponse){
    if(error.status == 500){
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error >:( , intentalo nuevamente.',
        showConfirmButton: false,
        timer: 2000
      })
    }else if(error.status == 404){
      Swal.fire({
        icon: 'question',
        title: 'Credenciales incorrectas.',
        text: error.error.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
    return throwError(error.message);
  }
}
