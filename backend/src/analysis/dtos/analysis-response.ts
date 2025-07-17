import { SentimentEnum } from "../enums/sentiment.enum";

export interface AnalysisResponse {
    category: string;
    sentiment: SentimentEnum;
    keywords: string[];
}
