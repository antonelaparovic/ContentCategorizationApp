import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { AnalysisModule } from './analysis/analysis.module';
import { ConfigModule } from '@nestjs/config';
import openaiConfig from './config/openai.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [OpenaiModule, AnalysisModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [openaiConfig]
  },
),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 5000,
          limit: 3,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
