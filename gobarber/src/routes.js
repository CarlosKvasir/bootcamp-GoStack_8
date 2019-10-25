import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Jose Carlos',
    email: 'jj2@cc.ll',
    password_hash: '123456',
  });

  return res.json(user);
});

export default routes;
