export class OrderItem {
  id: number;
  count: number;
}

export class CreateOrderRequestDto {
  order: OrderItem[];
}
