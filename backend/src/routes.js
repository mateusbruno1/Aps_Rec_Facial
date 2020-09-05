import { Router } from 'express';

const routes = new Router();

routes.get('/user',(req,res)=>{
  return res.json({hello:'World'})
});

export default routes;
