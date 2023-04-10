import { NextFunction, Request, Response } from 'express';
import { IsNull } from 'typeorm';
import config from 'config';

import {
  CreateRecordInput,
  DeleteRecordInput,
  GetRecordInput,
} from '../schemas/record.schema';
import { getRecord, paginate } from '../services/record.service';
import { findUserById } from '../services/user.service';
import { findOperationByType } from '../services/operation.service';
import AppError from '../utils/appError';
import { validateAndDecreaseCredits } from '../services/balance.service';
import { performOperation } from '../utils/operations';
import { PaginationOptions } from '../utils/paginate';
import { OperationsType } from '../utils/constants';

type FilterRecord = PaginationOptions & { operation: OperationsType };

export const createRecordHandler = async (
  req: Request<{}, {}, CreateRecordInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(res.locals.user.id);
    const operation = await findOperationByType(req.body.operator);
    if (!operation) next(new AppError(401, 'Operation do not exist'));
    const operationResponse = await validateAndDecreaseCredits(
      user!,
      operation!,
      async () =>
        new Promise<string | number | undefined>(async (resolve, reject) => {
          try {
            const result = await performOperation(req);
            resolve(result);
          } catch (err) {
            reject(err);
            next(err);
          }
        })
    );

    res.status(201).send(operationResponse);
  } catch (err: any) {
    next(err);
  }
};

export const getRecordHandler = async (
  req: Request<GetRecordInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const record = await getRecord(req.params.recordId);

    if (!record) {
      return next(new AppError(404, 'Record with that ID not found'));
    }

    res.status(200).json({
      record,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getRecordsHandler = async (
  req: Request<{}, {}, {}, FilterRecord>,
  res: Response,
  next: NextFunction
) => {
  const pageSize = isNaN(Number(req.query.limit))
    ? config.get<number>('pageSize')
    : Number(req.query.limit);
  const page = isNaN(Number(req.query.page)) ? 1 : Number(req.query.page);

  try {
    const { results, total } = await paginate({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: {
        user: { id: res.locals.user.id },
        deletedAt: IsNull(),
      },
      relations: ['operation'],
      order: { updatedAt: 'DESC' },
    });

    res.status(200).json({
      results,
      total,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteRecordHandler = async (
  req: Request<DeleteRecordInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const record = await getRecord(req.params.recordId);

    if (!record) {
      return next(new AppError(404, 'Record with that ID not found'));
    }

    record.deletedAt = new Date(Date.now());
    await record.save();

    res.status(204).end();
  } catch (err: any) {
    next(err);
  }
};
