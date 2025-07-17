export interface AnalysisResponse {
    category: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    keywords: string[];
}
