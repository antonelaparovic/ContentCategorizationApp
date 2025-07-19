import { IsString } from "class-validator";

export class AnalysisRequest {
    @IsString()
    text: string = '';
}