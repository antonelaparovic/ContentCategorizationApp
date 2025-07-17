import { BadGatewayException, Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { AnalysisResponseDto } from './dtos/analysis-response.dto';

@Injectable()
export class AnalysisService {
    constructor(private openai: OpenaiService) { }

    async analyze(text: string): Promise<AnalysisResponseDto> {
        const prompt = `
          You are an expert text analyzer.
          Your task is to analyze the user-provided text and output ONLY valid JSON with these three parameters:

            1. "category": a STRING representing the main theme or topic of the text (e.g. "Technology", "Cooking", "Sports", etc.)
            2. "sentiment": one of ["positive","neutral","negative"]
            3. "keywords": an ARRAY of exactly three strings, the three most relevant terms.

          Do NOT include any extra fields or explanatory text outside the JSON.
          Do NOT wrap the JSON in markdown or code brackets.

          Example:
          Input:
          """
          NestJS is a progressive Node.js framework for building efficient and scalable server-side applications.
          """
          Output:
          {
            "category":"Technology",
            "sentiment":"positive",
            "keywords":["NestJS","Node.js","scalable"]
          }

          Now analyze this text:
          """
          ${text}
          """
          `;
            
        const raw = await this.openai.runAnalysis(prompt);
        try {
            return JSON.parse(raw) as AnalysisResponseDto;
        } catch {
            throw new BadGatewayException(`Invalid JSON from OpenAI: ${raw}`);
        }
    }
}
