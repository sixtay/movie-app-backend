import { getModelToken } from '@nestjs/mongoose';

export const mockMongoProvider = (entity: string) => ({
  provide: getModelToken(entity),
  useValue: {
    new: jest.fn(),
    constructor: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    exec: jest.fn(),
  },
});
