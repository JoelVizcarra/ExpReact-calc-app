import { Record } from '../entities/record.entity';
import { User } from '../entities/user.entity';
import { Operation } from '../entities/operation.entity';
import { AppDataSource } from '../utils/data-source';
import { FindManyOptions } from 'typeorm';
import { Pagination } from '../utils/paginate';

const recordRepository = AppDataSource.getRepository(Record);

export const createRecord = async (
  input: Partial<Record>,
  user: User,
  operation: Operation
) => {
  return await recordRepository.save(
    recordRepository.create({ ...input, user, operation })
  );
};

export const getRecord = async (recordId: string) => {
  return await recordRepository.findOneBy({ id: recordId });
};

export const findMany = async (options: FindManyOptions) => {
  return await recordRepository.find(options);
};

export const paginate = async (
  options: FindManyOptions
): Promise<Pagination<Record>> => {
  const [results, total] = await recordRepository.findAndCount(options);

  return new Pagination<Record>({
    results,
    total,
  });
};
