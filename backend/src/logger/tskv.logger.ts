import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private escapeValue(value: string): string {
    return value.replace(/\t/g, '\\t').replace(/\n/g, '\\n');
  }

  private toStringValue(value: any): string {
    if (value instanceof Error) {
      return value.stack ? `${value.message} | ${value.stack}` : value.message;
    }

    if (typeof value === 'string') {
      return value;
    }

    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  formatMessage(level: string, message: any, optionalParams: any[]) {
    const parts: string[] = [];

    parts.push(`level=${this.escapeValue(level)}`);
    parts.push(`message=${this.escapeValue(this.toStringValue(message))}`);

    if (optionalParams.length > 0) {
      parts.push(
        `params=${this.escapeValue(this.toStringValue(optionalParams))}`,
      );
    }

    return parts.join('\t');
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('verbose', message, optionalParams));
  }
}
