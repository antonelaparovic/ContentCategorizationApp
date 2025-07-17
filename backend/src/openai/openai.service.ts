import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class OpenaiService {
    private client: OpenAI;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('OPENAI_API_KEY');
        this.client = new OpenAI({ apiKey });
    }

    async runAnalysis(prompt: string): Promise<string> {
        const resp = await this.client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.2,
        });
        return resp.choices[0].message.content ?? ''; // todo: empty??
    }
}
