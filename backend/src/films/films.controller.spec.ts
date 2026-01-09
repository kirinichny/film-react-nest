import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsListResponseDto, ScheduleListResponseDto } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;

  const filmsServiceMock = {
    getAllFilms: jest.fn(),
    getFilmSchedule: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: filmsServiceMock,
        },
      ],
    }).compile();

    controller = module.get(FilmsController);
    jest.clearAllMocks();
  });

  it('getAllFilms: вызывает FilmsService.getAllFilms и возвращает результат', async () => {
    const expectedResult: FilmsListResponseDto = {
      total: 1,
      items: [{ id: '1', title: 'Тестовый фильм' }],
    };

    filmsServiceMock.getAllFilms.mockResolvedValue(expectedResult);

    const result = await controller.getAllFilms();

    expect(filmsServiceMock.getAllFilms).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedResult);
  });

  it('getFilmSchedule: вызывает FilmsService.getFilmSchedule с id и возвращает результат', async () => {
    const filmId = '1';
    const expectedResult: ScheduleListResponseDto = {
      total: 1,
      items: [
        {
          id: 'schedule-1',
          daytime: '10:00',
          hall: 1,
          rows: 10,
          seats: 100,
          price: 300,
          taken: [],
        },
      ],
    };

    filmsServiceMock.getFilmSchedule.mockResolvedValue(expectedResult);

    const result = await controller.getFilmSchedule(filmId);

    expect(filmsServiceMock.getFilmSchedule).toHaveBeenCalledTimes(1);
    expect(filmsServiceMock.getFilmSchedule).toHaveBeenCalledWith(filmId);
    expect(result).toEqual(expectedResult);
  });
});
