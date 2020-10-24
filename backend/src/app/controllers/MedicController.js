import User from '../models/User';


class UserControlller{
  async index(req,res){
    const user = await User.findAll({
      where: {
        medic: true,
      },
    });

    return res.json(user)
  }
}

export default new UserControlller();
