import { registerAs } from '@nestjs/config';

export default registerAs('openai', () => {
    const tempString = process.env.OPENAI_TEMPERATURE ?? '0.2';
    const timeoutString = process.env.OPENAI_TIMEOUT_MS ?? '15000';
    const maxWordsString = process.env.OPENAI_MAX_PROMPT_WORDS ?? '1000';


    return {
        apiKey: process.env.OPENAI_API_KEY,
        model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
        temperature: parseFloat(tempString),
        timeoutMs: parseInt(timeoutString, 10),
        maxPromptWords: parseInt(maxWordsString, 10),
    };
});
