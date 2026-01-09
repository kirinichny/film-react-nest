import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('форматирует log-сообщения в JSON', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    logger.log('привет', { a: 1 }, 123);

    expect(spy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'log',
        message: 'привет',
        optionalParams: [{ a: 1 }, 123],
      }),
    );
  });

  it('форматирует error-сообщения в JSON и пишет в console.error', () => {
    const spy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    logger.error('ошибка', 'стек');

    expect(spy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'error',
        message: 'ошибка',
        optionalParams: ['стек'],
      }),
    );
  });

  it('форматирует warn-сообщения в JSON и пишет в console.warn', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    logger.warn('внимание');

    expect(spy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'warn',
        message: 'внимание',
        optionalParams: [],
      }),
    );
  });
});
