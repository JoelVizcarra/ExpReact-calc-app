import { NextFunction, Request, Response } from 'express';
import { findMany } from '../services/user.service';
import AppError from '../utils/appError';
import { UpdateUserInput } from '../schemas/user.schema';
import { getBalance } from '../services/balance.service';

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await findMany({
      where: { id: res.locals.user.id },
    });

    if (!results) {
      next(new AppError(404, 'Can not get user data'));
    }

    const user = results[0];

    res.status(200).status(200).json({
      user,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateUserHandler = async (
  req: Request<{}, {}, UpdateUserInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await findMany({
      where: { id: res.locals.user.id },
    });

    if (!results) {
      return next(new AppError(404, 'User with that ID not found'));
    }
    const user = results[0];
    Object.assign(user, req.body);

    const updatedUser = await user.save();

    res.status(200).json({
      user: updatedUser,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getUserBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const balance = await getBalance(res.locals.user.id);

    if (!balance) {
      next(new AppError(404, 'Can not get balance'));
    }

    res.status(200).status(200).json({
      balance,
    });
  } catch (err: any) {
    next(err);
  }
};
