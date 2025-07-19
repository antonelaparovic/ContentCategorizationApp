import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [OpenaiModule],
  controllers: [AnalysisController],
  providers: [AnalysisService]
})
export class AnalysisModule {}
