import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { TEST_MQ } from './conts/conts';
import { Job } from 'bull';

@Processor(TEST_MQ)
export class TestConsumer {
  @Process('TEST1')
  async testProcess(job: Job<unknown>) {
    console.log('Job starts in id', job.id);

    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 2000);
    });

    if (Number(job.id) % 2 === 0) {
      throw new Error('Job already exists');
    }

    console.log('====================================');
    console.log('Job complete', job.data);
    console.log('====================================');
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  // @OnQueueCompleted()
  // onComplete(job: Job) {
  //   console.log(`job complete ${job.id}`);
  // }

  @OnQueueFailed()
  onFailed(job: Job, err: Error) {
    console.log('====================================');
    console.log('job failed', job.id, err);
    console.log('====================================');
  }
}
