import config from '../../config/environment';

export default (req, res, next) => {
  const credentials = req.headers.authorization;

  if(!credentials) {
    return res.sendStatus(401);
  }

  const [user, password] = Buffer
    .from(credentials.replace('Basic ', ''), 'base64')
    .toString()
    .split(':');

  if(!(user === config.ENV.user) || !(password === config.ENV.password)) {
    return res.sendStatus(401);
  }

  next();
};
