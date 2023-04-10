import { NextFunction, Request, Response } from 'express';
import { Not } from 'typeorm';
import config from 'config';

import { PaginationOptions } from '../utils/paginate';
import { paginate } from '../services/operation.service';
import { OPERATIONS } from '../utils/constants';

export const getOperationsHandler = async (
  req: Request<{}, {}, {}, PaginationOptions>,
  res: Response,
  next: NextFunction
) => {
  const pageSize = isNaN(Number(req.query.limit))
    ? config.get<number>('pageSize')
    : Number(req.query.limit);
  const page = isNaN(Number(req.query.page)) ? 1 : Number(req.query.page);
  // TODO enable the buy_credits operation
  try {
    const { results, total } = await paginate({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { updatedAt: 'DESC' },
      where: { type: Not(OPERATIONS.buyCredits) },
    });

    res.status(200).json({
      results,
      total,
    });
  } catch (err: any) {
    next(err);
  }
};
