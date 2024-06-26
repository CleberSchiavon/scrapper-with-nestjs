import { Injectable, NestMiddleware, Logger } from '@nestjs/common'

import { Request, Response, NextFunction } from 'express'

@Injectable()
export class HTTPLoggerInterceptor implements NestMiddleware {
  private logger = new Logger('HTTP')

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url, body } = request
    const userAgent = request.get('user-agent') || ''
    response.on('close', () => {
      const { statusCode } = response
      const contentLength = response.get('content-length')

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip} BODY - ${JSON.stringify(
          body,
        )}`,
      )
    })

    next()
  }
}
