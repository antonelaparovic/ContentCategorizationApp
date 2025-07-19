import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service'; // opcionalno

@Injectable({ providedIn: 'root' })
export class LoadingInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // npr. this.loadingService.show();
        return next.handle(req).pipe(
            finalize(() => {
                // this.loadingService.hide();
            })
        );
    }
}
