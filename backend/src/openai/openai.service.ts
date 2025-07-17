import { BadRequestException, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OpenAI } from 'openai';
import openaiConfig from 'src/config/openai.config';

@Injectable()
export class OpenaiService {
    private client: OpenAI;

    constructor(
        @Inject(openaiConfig.KEY)
        private readonly config: ConfigType<typeof openaiConfig>,
    ) {
        if (!config.apiKey) {
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

        const words = prompt.trim().split(/\s+/).length;
        if (words > this.config.maxPromptWords) {
            throw new BadRequestException(
                `Prompt has ${words} words, allowed max ${this.config.maxPromptWords}`,
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
                throw new RequestTimeoutException('OpenAI request timeout');
            }
            throw err;
        } finally {
            clearTimeout(timeout);
        }
    }
}
