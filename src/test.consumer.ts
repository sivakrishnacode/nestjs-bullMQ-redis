import { Process, Processor } from '@nestjs/bull';
import { TEST_MQ } from './conts/conts';
import { Job } from 'bull';

@Processor(TEST_MQ)
export class TestConsumer {
  @Process()
  async testProcess(job: Job<unknown>) {
    console.log('Job id', job.id);

    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 2000);
    });

    console.log('Job complete', job.data);
  }
}
