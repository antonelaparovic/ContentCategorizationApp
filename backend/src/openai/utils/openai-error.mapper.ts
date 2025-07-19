import {
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    ServiceUnavailableException,
    BadGatewayException,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { APIError } from 'openai';

export class OpenAIErrorMapper {
    // error from openai sdk mapping to common nest error
    static map(err: unknown): HttpException {
        if (err instanceof APIError) {
            const status = err.status;
            const msg = err.message;

            switch (err.status) {
                case 400:
                    return new BadRequestException(
                        'Bad request — try again.',
                    );
                case 429:
                    return new HttpException(
                        'Too many requests — try a bit later.',
                        HttpStatus.TOO_MANY_REQUESTS,
                    );
                case 503:
                    return new ServiceUnavailableException(
                        'OenAI service not available — try later.',
                    );
                default:
                    // 401, 403, 404, 500... mapping to 502
                    return new ServiceUnavailableException(
                        'An unexpected error occured. Try again later.',
                    );
            }
        }
        // not APIError
        return new ServiceUnavailableException(
            'Service not available — try later.',
        );
    }

}
