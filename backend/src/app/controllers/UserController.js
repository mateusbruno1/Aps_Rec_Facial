import User from '../models/User';


class UserControlller{
  async store(req,res){
    const userExist = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExist) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create(req.body);

    return res.json(user)
  }
  async update(req, res) {

   const user = await User.findByPk(req.userId);
   
   user.update(req.body);

   return res.json(user)
  }

}

export default new UserControlller();
