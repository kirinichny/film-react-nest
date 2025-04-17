import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../repository/film.repository';
import { ERROR_MESSAGES } from '../constants/error-messages.constants';
import { sprintf } from 'sprintf-js';
import {
  CreateOrderRequestDto,
  OrderConfirmationResponseDto,
  TicketDetailsDto,
} from './dto/order.dto';
import { toTicketDetailsDto } from './converters/order.converter';

@Injectable()
export class OrderService {
  constructor(private readonly filmRepository: FilmRepository) {}

  async createOrder(
    createOrderDto: CreateOrderRequestDto,
  ): Promise<OrderConfirmationResponseDto> {
    const reservedTickets: TicketDetailsDto[] = [];
    const scheduleUpdates: Map<
      string,
      { sessionId: string; takenSeats: string[] }[]
    > = new Map();

    for (const ticket of createOrderDto.tickets) {
      const { film: filmId, session: sessionId, row, seat } = ticket;

      const filmData = await this.filmRepository.findById(filmId);
      if (!filmData) {
        throw new Error(sprintf(ERROR_MESSAGES.FILM_NOT_FOUND, filmId));
      }

      const sessionData = filmData.schedule.find(
        (schedule) => schedule.id === sessionId,
      );
      if (!sessionData) {
        throw new Error(
          sprintf(ERROR_MESSAGES.SESSION_NOT_FOUND, sessionId, filmData.title),
        );
      }

      const seatKey = `${row}:${seat}`;

      if (sessionData.taken.includes(seatKey)) {
        throw new Error(sprintf(ERROR_MESSAGES.SEAT_ALREADY_TAKEN, seatKey));
      }

      reservedTickets.push(toTicketDetailsDto(filmId, sessionData, row, seat));

      if (!scheduleUpdates.has(filmId)) {
        scheduleUpdates.set(filmId, []);
      }

      const updatesForFilm = scheduleUpdates.get(filmId);
      const existingUpdate = updatesForFilm.find(
        (u) => u.sessionId === sessionId,
      );

      if (existingUpdate) {
        existingUpdate.takenSeats.push(seatKey);
      } else {
        updatesForFilm.push({
          sessionId,
          takenSeats: [...sessionData.taken, seatKey],
        });
      }
    }

    for (const [filmId, updates] of scheduleUpdates.entries()) {
      const filmData = await this.filmRepository.findById(filmId);
      if (!filmData) {
        throw new Error(sprintf(ERROR_MESSAGES.FILM_NOT_FOUND, filmId));
      }

      filmData.schedule = filmData.schedule.map((schedule) => {
        const update = updates.find((u) => u.sessionId === schedule.id);
        return update ? { ...schedule, taken: update.takenSeats } : schedule;
      });

      await this.filmRepository.update(filmId, { schedule: filmData.schedule });
    }

    return {
      total: reservedTickets.length,
      items: reservedTickets,
    };
  }
}
