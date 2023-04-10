export default {
  port: 'PORT',
  postgresConfig: {
    host: 'POSTGRES_HOST',
    port: 'POSTGRES_PORT',
    username: 'POSTGRES_USER',
    password: 'POSTGRES_PASSWORD',
    database: 'POSTGRES_DB',
  },
  redisUrl: 'REDIS_URL',
  services: {
    randomOrgApiKey: 'RANDOM_ORG_API_KEY',
    randomOrgApiUrl: 'RANDOM_ORG_API_URL',
  },
  access_tokenPrivateKey: 'JWT_ACCESS_TOKEN_PRIVATE_KEY',
  access_tokenPublicKey: 'JWT_ACCESS_TOKEN_PUBLIC_KEY',
  refreshTokenPrivateKey: 'JWT_REFRESH_TOKEN_PRIVATE_KEY',
  refreshTokenPublicKey: 'JWT_REFRESH_TOKEN_PUBLIC_KEY',
};
