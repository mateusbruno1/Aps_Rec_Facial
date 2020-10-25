import User from '../models/User';


class UserControlller{
  async index(req,res){
    const user = await User.findAll({
      where: {
        medic: true,
      },
      attributes:[
        'id','name','crm','especiality','quantity_consults'
      ]
    });

    return res.json(user)
  }
}

export default new UserControlller();
