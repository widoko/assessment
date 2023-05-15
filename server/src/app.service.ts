import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { catchError, map, lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello() {
    return 'Hello World';
  }

  async findAll() {
    const request = this.httpService
      .get('https://dummyjson.com/products')
      .pipe(map((res) => res.data))
      .pipe(map((res) => res.products))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    const fact = await lastValueFrom(request);

    return {
      data: fact,
    };
  }

  async findProduct(id: string) {
    const request = this.httpService
      .get(`https://dummyjson.com/products/${id}`)
      .pipe(map((res) => res.data))
      .pipe(
        catchError((e) => {
          throw new Error(e);
          throw new ForbiddenException('API not available');
        }),
      );

    const fact = await lastValueFrom(request);

    return {
      data: fact
    };
  }
}
