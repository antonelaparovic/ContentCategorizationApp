import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisRequestDto } from './dtos/analysis-request.dto';
import { AnalysisResponseDto } from './dtos/analysis-response.dto';

@Controller('analysis')
export class AnalysisController {
    constructor(private readonly analysisService: AnalysisService) { }

    @Post()
    async analyze(@Body(new ValidationPipe()) dto: AnalysisRequestDto): Promise<AnalysisResponseDto> {
        return this.analysisService.analyze(dto.text);
    }
}
