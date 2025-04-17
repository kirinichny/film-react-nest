export class CreateOrderRequestDto {
  email: string;
  phone: string;
  tickets: TicketDetailsDto[];
}

export class TicketDetailsDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class OrderConfirmationResponseDto {
  total: number;
  items: TicketDetailsDto[];
}
