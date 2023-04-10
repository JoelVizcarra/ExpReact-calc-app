import { z, object, string, number, TypeOf } from 'zod';

export const createRecordSchema = object({
  body: object({
    operator: string(),
    a: number().optional(),
    b: number().optional(),
  }),
});

const params = {
  params: object({
    recordId: string(),
  }),
};

export const getRecordSchema = object({
  ...params,
});

export const deleteRecordSchema = object({
  ...params,
});

export type CreateRecordInput = TypeOf<typeof createRecordSchema>['body'];
export type GetRecordInput = TypeOf<typeof getRecordSchema>['params'];
export type DeleteRecordInput = TypeOf<typeof deleteRecordSchema>['params'];
