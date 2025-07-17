import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisRequest } from './dtos/analysis-request';
import { AnalysisResponse } from './dtos/analysis-response';

@Controller('analysis')
export class AnalysisController {
    constructor(private readonly analysisService: AnalysisService) { }

    @Post()
    async analyze(@Body(new ValidationPipe()) dto: AnalysisRequest): Promise<AnalysisResponse> {
        return this.analysisService.analyze(dto.text);
    }
}
