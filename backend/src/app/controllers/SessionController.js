import User from '../models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class SessionController{
 async store(req,res){ 
  const {email, password} = req.body;
  const user = await User.findOne({ where : {email}});
  if (!user){
    return res.status(401).json({error:'User not found'});
  }
  if (!(await user.checkPassword(password))){
    return res.status(401).json({error:"Password does not match"})
  }
  const {id,name,medic,provider} = user;

  return res.json({
    user:{
      id,
      name,
      email,
      medic,
      provider
    },
    token: jwt.sign({id}, authConfig.secret,{
      expiresIn: authConfig.expiresIn,
    } )
  })
 }
 async recfacial(req,res){ 
  const {nome} = req.params;
  const user = await User.findOne({ where : {name:nome}});
  if (!user){
    return res.status(401).json({error:'User not found'});
  }
 
  const {id,name,medic,provider} = user;

  return res.json({
    user:{
      id,
      name,
      medic,
      provider
    },
    token: jwt.sign({id}, authConfig.secret,{
      expiresIn: authConfig.expiresIn,
    } )
  })
 }
}

export default new SessionController();
