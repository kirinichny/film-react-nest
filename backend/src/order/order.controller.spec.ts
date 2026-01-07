import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {
  CreateOrderRequestDto,
  OrderConfirmationResponseDto,
} from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;

  const orderServiceMock = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: orderServiceMock,
        },
      ],
    }).compile();

    controller = module.get(OrderController);
    jest.clearAllMocks();
  });

  it('createOrder: вызывает OrderService.createOrder и возвращает результат', async () => {
    const dto: CreateOrderRequestDto = {
      email: 'test@example.com',
      phone: '+79990001122',
      tickets: [
        {
          film: '1',
          session: 'schedule-1',
          daytime: '10:00',
          row: 1,
          seat: 2,
          price: 300,
        },
      ],
    };

    const expectedResult: OrderConfirmationResponseDto = {
      total: 300,
      items: dto.tickets,
    };

    orderServiceMock.createOrder.mockResolvedValue(expectedResult);

    const result = await controller.createOrder(dto);

    expect(orderServiceMock.createOrder).toHaveBeenCalledTimes(1);
    expect(orderServiceMock.createOrder).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});
