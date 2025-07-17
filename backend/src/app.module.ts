import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { AnalysisModule } from './analysis/analysis.module';
import { ConfigModule } from '@nestjs/config';
import openaiConfig from './config/openai.config';

@Module({
  imports: [OpenaiModule, AnalysisModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [openaiConfig]
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
