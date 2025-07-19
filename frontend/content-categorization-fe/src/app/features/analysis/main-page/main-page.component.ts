import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PromptInputComponent } from '../prompt-input/prompt-input.component';
import { ResultComponent } from '../result/result.component';
import { AnalysisService } from '../../../core/services/analysis.service';
import { catchError, finalize, of } from 'rxjs';
import { AnalysisResponse } from "../../../core/dtos/analysis-response";
import { AnalysisRequest } from "../../../core/dtos/analysis-request";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  imports: [
    CommonModule,
    PromptInputComponent,
    ResultComponent,
],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  result: AnalysisResponse | null = null;
  loading = false;

  errorMessage: string | null = null;

  constructor(private analysisService: AnalysisService) { }

  onTextSubmit(text: string) {
    this.loading = true;
    this.errorMessage = null;

    var prompt: AnalysisRequest = {
      text: text
    }

    this.analysisService.analyzeText(prompt).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: (res) => {
        this.result = res;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message
          || 'An unexpected error occured. Try again later.';
      }
    });
  }
}
