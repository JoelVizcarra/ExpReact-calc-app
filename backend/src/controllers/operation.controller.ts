import { NextFunction, Request, Response } from 'express';
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

  try {
    const { results, total } = await paginate({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { updatedAt: 'DESC' },
    });

    res.status(200).json({
      results: results.filter(({ type }) => type !== OPERATIONS.buyCredits),
      total,
    });
  } catch (err: any) {
    next(err);
  }
};
