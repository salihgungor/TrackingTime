import { Test, TestingModule } from '@nestjs/testing';
import { TrackingtimeService } from './trackingtime.service';

describe('TrackingtimeService', () => {
  let service: TrackingtimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackingtimeService],
    }).compile();

    service = module.get<TrackingtimeService>(TrackingtimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
