import { Inject, Injectable } from '@nestjs/common';
import { TEST_MQ } from './conts/conts';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue(TEST_MQ) private readonly testMQ: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }

  async test() {
    for (let i = 0; i < 10; i++) {
      await this.testMQ.add('TEST1', {
        data: `hello`,
      });
    }

    console.log(Date.now());
  }
}
