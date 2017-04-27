const environment = process.env.NODE_ENV;
let user;
let password;
let sseRefreshTime;

if (environment === 'development') {
  user = 'test@example';
  password = 'mypassword';
  sseRefreshTime = 30;
}

if (environment === 'test') {
  user = 'test@example';
  password = 'mypassword';
  sseRefreshTime = 30;
}

if (environment === 'production') {
  user = process.env.USER;
  password = process.env.PASSWORD;
  sseRefreshTime = process.env.SSE_REFRESH_TIME || 30;
}

module.exports = {
  ENV: {
    user,
    password,
  }
};
