import { NextFunction, Request } from 'express';
import { CreateRecordInput } from '../schemas/record.schema';
import fetchRandomString from '../services/random.service';
import { OPERATIONS } from './constants';
import AppError from './appError';

type TwoNumOperators =
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division';

const addition = (a: number, b: number): number => a + b;
const subtraction = (a: number, b: number): number => a - b;
const multiplication = (a: number, b: number): number => a * b;
const division = (a: number, b: number): number => a / b;
const squareRoot = (a: number): number => Math.sqrt(a);

const TWO_NUM_OPERATIONS = {
  addition,
  subtraction,
  multiplication,
  division,
};

export const performOperation = async (
  req: Request<{}, {}, CreateRecordInput>
) => {
  if (req.body.operator === OPERATIONS.division) {
    if (req.body.b == 0) throw new AppError(400, 'Division by zero');
  }
  let result;
  if (req.body.operator === OPERATIONS.randomString) {
    const { data } = await fetchRandomString({ num: 1, len: 10 });
    result = data;
  } else if (req.body.operator === OPERATIONS.squareRoot) {
    result = squareRoot(req.body.a!);
  } else {
    result = TWO_NUM_OPERATIONS[req.body.operator as TwoNumOperators](
      req.body.a!,
      req.body.b!
    );
  }
  return result;
};
