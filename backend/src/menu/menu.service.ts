import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuService {
  findAll() {
    return [
      { item: "Croissant", price: 2.50 },
      { item: "Baguette", price: 3.00 },
      { item: "Macaron", price: 1.20 },
      // Add more items as needed
    ];
  }
}