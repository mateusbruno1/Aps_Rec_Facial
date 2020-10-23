import React,{useState} from 'react';
import { Form, Input } from '@rocketseat/unform';
import cep from 'cep-promise';
import api from '../../services/api';
import { Container } from './styles';

function Cadastro() {

  const [medico,setMedico] = useState(false);

  async function handleSubmit({nome,email,cep,estado,cidade,endereco,bairro,numero,celular,crm,senha}){
    try {
        const user = await api.post('/users',{
           name: nome,
           email: email,
           cep: cep,
           esstate: estado,
           city: cidade,
           street: endereco,
           neighborhood: bairro,
           number: numero,
           phone: celular, 
           password: senha,
           medic:medico
        })
        console.log(user);
    } catch (error) {
        
    }
  }
  return(
    <Container>

        <h1>Formulário de Cadastro</h1>

        <Form className="form" onSubmit={handleSubmit}>
                <Input type="text" name="nome"    placeholder="Digite seu nome completo" required/>
                <Input type="text" name="email"    placeholder="Digite seu e-mail" required/>
                <Input type="text" name="cep"   placeholder="Digite seu CEP" required/>
                <Input type="text" name="estado"    placeholder="Digite sua UF" required/>
                <Input type="text" name="cidade"    placeholder="Digite sua cidade" required/>
                <Input type="text" name="endereco"    placeholder="Digite seu endereço" required/>
                <Input type="text" name="bairro"    placeholder="Digite seu bairro" required/>
                <Input type="text" name="numero"    placeholder="Digite o nº da residência" required/>
                <Input type="text" name="celular"    placeholder="Digite o seu celular" required/>

            <div className="div-select">
                <label>Você é um médico?</label>
                <select required name="medico">
                    <option onClick={()=>setMedico(false)} value={false}>Não</option>
                    <option onClick={()=>setMedico(true)} value={true}>Sim</option>
                </select>
            </div>

            {medico
            ? <Input type="text" name="crm"   placeholder="Digite seu registro no Conselho Regional de Medicina (CRM)" required/>
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