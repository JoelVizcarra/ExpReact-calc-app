import config from 'config';
import { FindManyOptions } from 'typeorm';
import { User } from '../entities/user.entity';
import redisClient from '../utils/connectRedis';
import { AppDataSource } from '../utils/data-source';
import { signJwt } from '../utils/jwt';
import { Pagination, PaginationOptions } from '../utils/paginate';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: Partial<User>) => {
  return await userRepository.save(userRepository.create(input));
};

export const findUserByEmail = async ({ email }: { email: string }) => {
  const results = await userRepository.find({
    where: { email: email },
    relations: ['balance'],
  });
  return results[0];
};

export const findUserById = async (userId: string) => {
  return await userRepository.findOneBy({ id: userId });
};

export const findMany = async (options: FindManyOptions) => {
  return await userRepository.find(options);
};

export const paginate = async (
  options: FindManyOptions
): Promise<Pagination<User>> => {
  const [results, total] = await userRepository.findAndCount(options);

  return new Pagination<User>({
    results,
    total,
  });
};

export const findUser = async (query: Object) => {
  return await userRepository.findOneBy(query);
};

export const signTokens = async (user: User) => {
  redisClient.set(user.id, JSON.stringify(user), {
    EX: config.get<number>('redisCacheExpiresIn') * 60,
  });

  const access_token = signJwt({ sub: user.id }, 'access_tokenPrivateKey', {
    expiresIn: `${config.get<number>('access_tokenExpiresIn')}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
  });

  return { access_token, refresh_token };
};
