import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { AnalysisModule } from './analysis/analysis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [OpenaiModule, AnalysisModule, ConfigModule.forRoot({
    isGlobal: true }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
