import React,{useEffect, useState} from 'react';
import { Form, Input } from '@rocketseat/unform';
import api from '../../services/api';
import { Container } from './styles';

function Cadastro() {

  const [medico,setMedico] = useState(false);
  const [state,setState] = useState('');
  const [city,setCity] = useState('');
  const [neighborhood,setNeighborhood] = useState('');
  const [street,setStreet] = useState('');

  useEffect(() => {
    console.log(medico);
  }, [medico])

  const cep = {
      estado:state,
      cidade:city,
      bairro:neighborhood,
      endereco:street
  }

  function handlerSelect(value) {
    setMedico(!value)
  }

  async function retornaCep(){
    try {
        const cepNumber = document.getElementById("cep").value
        const {data} = await api.post(`/cep/${cepNumber}`)

        setStreet(data.street);
        setState(data.state);
        setNeighborhood(data.bairro);
        setCity(data.city);
    } catch (error) {

    }

  }

  function redirecionarLogin(){
    document.location.href = 'http://127.0.0.1:5500/Esbo%C3%A7o/';
  }

  async function handleSubmit({nome,email,cep,estado,cidade,endereco,bairro,numero,especiality,celular,crm,senha,senha2}){
    try {
        if(senha !== senha2){
          alert('A senha e a confirmação de senha devem ser iguais ')
        }else{
          const user = await api.post('/users',{
            name: nome,
            email: email,
            cep: cep,
            state: estado,
            city: cidade,
            street: endereco,
            neighborhood: bairro,
            number: numero,
            phone: celular,
            password: senha,
            medic:medico,
            crm,
            especiality

         })
         alert('Cadastrado com Sucesso');
         redirecionarLogin();
        }
    } catch (error) {
         alert('Erro ao cadastrar o Usuario tente novamente');
    }
  }
  return(
    <Container>

        <h1>Formulário de Cadastro</h1>

        <Form className="form" onSubmit={handleSubmit} initialData={cep}>
                <Input type="text" name="nome"    placeholder="Digite seu nome completo" required/>
                <Input type="text" name="email"    placeholder="Digite seu e-mail" required/>
                <Input type="text" name="cep" id="cep" onBlur={()=>retornaCep()} placeholder="Digite seu CEP" required/>
                <Input type="text" name="estado"   placeholder="Digite sua UF" required/>
                <Input type="text" name="cidade"    placeholder="Digite sua cidade" required/>
                <Input type="text" name="endereco"    placeholder="Digite seu endereço" required/>
                <Input type="text" name="bairro"    placeholder="Digite seu bairro" required/>
                <Input type="number" name="numero"    placeholder="Digite o nº da residência" required/>
                <Input type="phone" name="celular"    placeholder="Digite o seu celular" required/>

            <div className="div-select">
                <label>Você é um médico?</label>
                <select onChange={() => handlerSelect(medico)} required name="medico">
                    <option value={false}>Não</option>
                    <option value={true}>Sim</option>
                </select>
            </div>

            {medico ?
              <>
              <Input type="text" name="crm"   placeholder="Digite seu registro no Conselho Regional de Medicina (CRM)" required/>
              <Input type="text" name="especiality"   placeholder="Digite sua especialidade" required/>
              </>
            : null}

            <Input type="password" name="senha"    placeholder="Crie uma senha" required/>
            <Input type="password" name="senha2"   placeholder="Confirme sua senha" required/>

            <div className="div-botao">
                <button
                    className="botao">Cadastrar
                </button>
            </div>
        </Form>
    </Container>
)
}

export default Cadastro;
