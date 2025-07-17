import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalysisResponse } from '../models/analysis-response';
import { environment } from '../../environments/environment';
import { AnalysisRequest } from '../models/analysis-request';

@Injectable({ providedIn: 'root' })
export class AnalysisService {
    constructor(private http: HttpClient) { }

    analyzeText(prompt: AnalysisRequest): Observable<AnalysisResponse> {
        return this.http.post<AnalysisResponse>(
            `${environment.apiUrl}/analysis`, prompt
        );
    }
}
