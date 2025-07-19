import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger, RequestTimeoutException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ThrottlerException } from '@nestjs/throttler';
import { APIError, OpenAI } from 'openai';
import openaiConfig from 'src/config/openai.config';
import { OpenAIErrorMapper } from './utils/openai-error.mapper';

@Injectable()
export class OpenaiService {
    private client: OpenAI;
    private readonly logger = new Logger(OpenaiService.name);

    constructor(
        @Inject(openaiConfig.KEY)
        private readonly config: ConfigType<typeof openaiConfig>,
    ) {
        if (!config.apiKey) {
            this.logger.error('OPENAI_API_KEY not set');
            throw new Error('OPENAI_API_KEY not set');
        }
        this.client = new OpenAI({ apiKey: config.apiKey });
    }

    async runAnalysis(prompt: string): Promise<string> {
        const controller = new AbortController();
        const timeout = setTimeout(
            () => controller.abort(),
            this.config.timeoutMs,
        );

        // trim words between spaces
        const wordCount = prompt.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount > this.config.maxPromptWords) {
            this.logger.warn(
                `Prompt has ${wordCount} words, allowed max ${this.config.maxPromptWords}`,
            );
            throw new BadRequestException(
                `Prompt has ${wordCount} words, allowed max ${this.config.maxPromptWords}`,
            );
        }

        try {
            const resp = await this.client.chat.completions.create(
                {
                    model: this.config.model,
                    messages: [{ role: 'user', content: prompt }],
                    temperature: this.config.temperature,
                },
                { signal: controller.signal },
            );

            const text = resp.choices?.[0]?.message?.content;
            if (!text) {
                return '';
            }
            return text;
        } catch (err: any) {
            if (err.name === 'AbortError') {
                this.logger.warn(
                    `'OpenAI request timeout'`,
                );
                throw new RequestTimeoutException('OpenAI request timeout');
            }
            if (err instanceof ThrottlerException) { // from controller decorator
                this.logger.error(
                    `Too many requests error.`,
                );
                throw new HttpException('Too many requests — try a bit later.', HttpStatus.TOO_MANY_REQUESTS);
            }

            if (err instanceof APIError) {
                this.logger.error(
                    `OpenAI APIError: status=${err.status}, message=${err.message}`,
                );
                throw OpenAIErrorMapper.map(err);
            }

            // unexpected
            this.logger.error('Unknown error calling OpenAI', err);
            throw new ServiceUnavailableException(
                'OpenAI service not available — try later.',
            );
        } finally {
            clearTimeout(timeout);
        }

    }
}
