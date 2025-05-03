import { TicketDetailsDto } from '../dto/order.dto';
import { ISchedule } from '../../films/interfaces/film.interface';

export function toTicketDetailsDto(
  filmId: string,
  schedule: ISchedule,
  row: number,
  seat: number,
): TicketDetailsDto {
  return {
    film: filmId,
    session: schedule.id,
    daytime: schedule.daytime.toISOString(),
    row: row,
    seat: seat,
    price: schedule.price,
  };
}
