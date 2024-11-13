import { ReadableStreamDefaultController } from "web-streams-polyfill/polyfill";
import pLimit from "p-limit";
import PQueue from "p-queue";
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
  maxConcurrent: 10,
  minTime: 100,
});

async function* integers() {
  let i = 1;
  while (true) {
    console.log(`yielding ${i}`);
    yield i++;

    await sleep(100);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createStream(iterator: AsyncGenerator<number, void, unknown>) {
  return new ReadableStream({
    async pull(controller: ReadableStreamDefaultController<number>) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

async function backpressureDemo() {
  const stream = createStream(integers());
  const reader = stream.getReader();
  const loopCount = 5;
  const limit = pLimit(2);
  const queue = new PQueue({ concurrency: 2 });

  for (let i = 0; i < loopCount; i++) {
    await limit(async () => {
      const { value } = await reader.read();
      console.log(`Stream value: ${value}`);
      await sleep(1000);
    });

    await queue.add(async () => {
      const { value } = await reader.read();
      console.log(`Queue Stream value: ${value}`);
      await sleep(500);
    });
  }
}

export async function GET() {
  await limiter.schedule(() => backpressureDemo());
  return new Response("Check your console to see the result!");
}
