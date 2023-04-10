import { Operation } from '../entities/operation.entity';
import { AppDataSource } from '../utils/data-source';
import { FindManyOptions } from 'typeorm';
import { Pagination } from '../utils/paginate';

const operationRepository = AppDataSource.getRepository(Operation);

export const createOperation = async (input: Partial<Operation>) => {
  return await operationRepository.save(
    operationRepository.create({ ...input })
  );
};

export const getOperation = async (operationId: string) => {
  return await operationRepository.findOneBy({ id: operationId });
};

export const findOperationByType = async (operationType: string) => {
  return await operationRepository.findOneBy({ type: operationType });
};

export const findOperations = async () => {
  return await operationRepository.find({});
};

export const paginate = async (
  options: FindManyOptions
): Promise<Pagination<Operation>> => {
  const [results, total] = await operationRepository.findAndCount(options);

  return new Pagination<Operation>({
    results,
    total,
  });
};
