export class AnalysisResponseDto {
    category: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    keywords: string[];
}
