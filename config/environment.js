const environment = process.env.NODE_ENV;
let user;
let password;
let sseRefreshTime;

if (environment === 'development') {
  user = 'test@example';
  password = 'mypassword';
  sseRefreshTime = 30000;
}

if (environment === 'test') {
  user = 'test@example';
  password = 'mypassword';
  sseRefreshTime = 30000;
}

if (environment === 'production') {
  user = process.env.USER;
  password = process.env.PASSWORD;
  sseRefreshTime = 30000;
}

module.exports = {
  ENV: {
    user,
    password,
  }
};
