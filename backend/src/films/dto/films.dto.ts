export class FilmDetailsDto {
  id: string;
  title: string;
  rating?: number;
  director?: string;
  tags?: string[];
  about?: string;
  description?: string;
  image?: string;
  cover?: string;
}

export class ScheduleDto {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class FilmsListResponseDto {
  total: number;
  items: FilmDetailsDto[];
}

export class ScheduleListResponseDto {
  total: number;
  items: ScheduleDto[];
}
