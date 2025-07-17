import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PromptInputComponent } from '../prompt-input/prompt-input.component';
import { ResultComponent } from '../result/result.component';
import { AnalysisService } from '../../../core/services/analysis.service';
import { finalize } from 'rxjs';
import { AnalysisResponse } from '../../../core/models/analysis-response';
import { AnalysisRequest } from '../../../core/models/analysis-request';
import { LoaderComponent } from "../../../shared/loader/loader.component";

@Component({
  selector: 'app-main-page',
  imports: [
    CommonModule,
    PromptInputComponent,
    ResultComponent,
    LoaderComponent
],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  result: AnalysisResponse | null = null;
  loading = false;

  constructor(private analysisService: AnalysisService) { }

  onTextSubmit(text: string) {
    this.loading = true;
    var prompt: AnalysisRequest = {
      text: text
    }
    this.analysisService.analyzeText(prompt)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => this.result = res,
        error: () => this.result = null
      });
  }
}
