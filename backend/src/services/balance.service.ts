import { AppDataSource } from '../utils/data-source';
import { Balance } from '../entities/balance.entity';
import { Record } from '../entities/record.entity';
import { OPERATIONS } from '../utils/constants';
import { findOperationByType } from './operation.service';
import { Operation } from '../entities/operation.entity';
import { User } from '../entities/user.entity';
import AppError from '../utils/appError';

const balanceRepository = AppDataSource.getRepository(Balance);

export const createBalance = async (input: Partial<Balance>) => {
  return await balanceRepository.save(balanceRepository.create(input));
};

export const getBalance = async (userId: string) => {
  return await balanceRepository.findOne({ where: { user: { id: userId } } });
};

export const validateAndDecreaseCredits = async (
  user: User,
  operation: Operation,
  performOperation: () => Promise<string | number | undefined>
) =>
  await AppDataSource.transaction(async (transactionalEntityManager) => {
    const balance = await transactionalEntityManager
      .createQueryBuilder(Balance, 'balance')
      .where('balance.userId = :userId', { userId: user.id })
      .setLock('pessimistic_write')
      .getOne();

    if (!balance || balance.credits < operation.cost) {
      throw new AppError(402, 'Insufficient credits');
    }

    balance.credits -= operation.cost;
    try {
      const result = await performOperation();
      const operationResponse = {
        result,
      };
      await transactionalEntityManager.save(balance);
      const record = new Record();
      record.user = user;
      record.amount = operation.cost;
      record.operationResponse = JSON.stringify(operationResponse);
      record.operation = operation;
      await transactionalEntityManager.save(record);
      return operationResponse;
    } catch (err) {}
  });

//TODO: implement buy_credits operation
// export const increaseCredit = async (
//   userId: number,
//   amount: number
// ): Promise<void> =>
//   await AppDataSource.transaction(async (transactionalEntityManager) => {
//     const balance = await transactionalEntityManager
//       .createQueryBuilder(Balance, 'balance')
//       .where('balance.userId = :userId', { userId })
//       .setLock('pessimistic_write')
//       .getOne();

//     if (!balance) {
//       const newBalance = new Balance();
//       newBalance.user = <any>userId;
//       newBalance.credits = amount;
//       await transactionalEntityManager.save(newBalance);
//     } else {
//       balance.credits += amount;
//       await transactionalEntityManager.save(balance);
//     }

//     const buyCreditsOperation = await findOperationByType(
//       OPERATIONS.buyCredits
//     );
//     if (!buyCreditsOperation) {
//       throw new AppError(404, 'can not find buy_credits operation');
//     }
//     const record = new Record();
//     record.user = <any>userId;
//     record.amount = amount;
//     record.operation = buyCreditsOperation;
//     await transactionalEntityManager.save(record);
//   });
