export default {
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.REFRESH_PUBLIC_KEY,
  accessTokenTtl: process.env.ACCESS_TOKEN_TIME_TO_LEFT,
  refreshTokenTtl: process.env.REFRESH_TOKEN_TIME_TO_LEFT,
  saltWorkFactor: process.env.SALT_WORK_FACTOR,
  dbUri: process.env.DB_CONNECTION,
  port: process.env.PORT,
};
