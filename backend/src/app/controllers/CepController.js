import cep from 'cep-promise'
class CepController{
 async find(req,res){
  const {cepNumber} = req.params
  cep(cepNumber)
  .then(data =>{
    return res.json(data);
  })

 }
}

export default new CepController();
