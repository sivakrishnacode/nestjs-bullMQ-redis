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
    setTimeout(async () => {
      await this.testMQ.add({
        data: `hello`,
        ko: 'sassass',
      });
    }, 2000);

    return 'hii';
  }
}
