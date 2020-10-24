import Sequelize,{ Model } from 'sequelize';
import bcrypt from 'bcryptjs';
class User extends Model {
  static init(sequelize){
    super.init(
      {
          name: Sequelize.STRING,
          email: Sequelize.STRING,
          city: Sequelize.STRING,
          street: Sequelize.STRING,
          state: Sequelize.STRING,
          neighborhood: Sequelize.STRING,
          cep: Sequelize.STRING,
          number: Sequelize.INTEGER,
          phone:Sequelize.STRING,
          password: Sequelize.VIRTUAL,
          password_hash:Sequelize.STRING,
          crm:Sequelize.STRING,
          quantity_consults: Sequelize.INTEGER,
          medic:Sequelize.BOOLEAN,
          provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    ),
    this.addHook('beforeSave',async (user)=>{
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password,8);
      }
    });
    return this;
  }
  checkPassword(password){
    return bcrypt.compare(password,this.password_hash);
  }
}

export default User;
