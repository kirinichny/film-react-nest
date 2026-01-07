import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('форматирует log-сообщения в TSKV', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    logger.log('привет', { a: 1 });

    expect(spy).toHaveBeenCalledWith(
      'level=log\tmessage=привет\tparams=[{"a":1}]',
    );
  });

  it('экранирует табы и переносы строк в значениях', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    logger.log('это\nтест\t!', 'x\ty');

    expect(spy).toHaveBeenCalledWith(
      'level=log\tmessage=это\\nтест\\t!\tparams=["x\\ty"]',
    );
  });

  it('форматирует error-сообщения и пишет в console.error', () => {
    const spy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    logger.error('ошибка');

    expect(spy).toHaveBeenCalledWith('level=error\tmessage=ошибка');
  });
});
