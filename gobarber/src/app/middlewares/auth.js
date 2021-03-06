import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const autHeader = req.headers.authorization;

  // have autHeader ?
  if (!autHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = autHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // add userId in req
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
