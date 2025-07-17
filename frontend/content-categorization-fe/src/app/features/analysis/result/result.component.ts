import { Component, Input } from '@angular/core';
import { AnalysisResponse } from '../../../../../../../shared/dtos/analysis-response';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../../shared/loader/loader.component";

@Component({
  selector: 'app-result',
  imports: [
    CommonModule,
    LoaderComponent
],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  @Input() result: AnalysisResponse | null = null;
  @Input() loading: boolean = false;
}
