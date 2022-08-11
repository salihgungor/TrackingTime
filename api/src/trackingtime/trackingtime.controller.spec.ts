import { Test, TestingModule } from '@nestjs/testing';
import { TrackingtimeController } from './trackingtime.controller';
import { TrackingtimeService } from './trackingtime.service';

describe('TrackingtimeController', () => {
  let controller: TrackingtimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackingtimeController],
      providers: [TrackingtimeService],
    }).compile();

    controller = module.get<TrackingtimeController>(TrackingtimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
