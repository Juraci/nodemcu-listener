const environment = process.env.NODE_ENV;
let user;
let password;

if (environment === 'development') {
  user = 'test@example';
  password = 'mypassword';
}

if (environment === 'test') {
  user = 'test@example';
  password = 'mypassword';
}

if (environment === 'production') {
  user = process.env.USER;
  password = process.env.PASSWORD;
}

module.exports = {
  ENV: {
    user,
    password,
  }
};
