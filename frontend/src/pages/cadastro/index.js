import React, {Component} from 'react';
import {Container} from './styles.js';
import cep from 'cep-promise';
import api from '../../services/api';

// import { Container } from './styles';

export default class Cadastro extends Component {

    constructor(props){
        super(props);
        this.state = {
            default: false,
            nome: '',
            email: '',
            cep: '',
            cidade: '',
            estado: '',
            endereco: '',
            bairro: '',
            numero: '',
            celular: '',
            isMedico: false,
            crm: '',
            senha: '',
            senha2: '',
        }
    }

    async cadastro() {
        const medico = {
            name: this.state.nome,
            email: this.state.email,
            city: this.state.cidade,
            street: this.state.cidade,
            number: this.state.numero,
            cep: this.state.cep,
            state: this.state.estado,
            medic: true,
            crm: this.state.crm,
            neighborhood: this.state.bairro,
            phone: this.state.celular,
            password: this.state.senha2
        }
        const usuario = {
            name: this.state.nome,
            email: this.state.email,
            city: this.state.cidade,
            street: this.state.cidade,
            number: this.state.numero,
            cep: this.state.cep,
            state: this.state.estado,
            neighborhood: this.state.bairro,
            phone: this.state.celular,
            password: this.state.senha2
        }
        try {
            if (this.state.isMedico) {
                const create = await api.post('/users', medico);
                console.log(create);
            } else {
                const create = await api.get('/users', usuario);
                console.log(create);
            }
        } catch (error) {
            console.log(error.data);
        }
    }

    handlerState(event, medico) {
        switch (event.target.name) {
            case 'nome':
                this.setState({
                    nome: event.target.value
                })
                break;
                case 'email':
                    this.setState({
                        email: event.target.value
                    })
                    break;
                    case 'cep':
                        this.setState({
                            cep: event.target.value
                        })
                        cep(event.target.value)
                            .then(res => {
                                this.setState({
                                    estado: res.state,
                                    cidade: res.city,
                                    endereco: res.street,
                                    bairro: res.neighborhood
                                })
                            })
                break;
                case 'estado':
                this.setState({
                    estado: event.target.value
                })
                break;
                case 'cidade':
                this.setState({
                    cidade: event.target.value
                })
                break;
                case 'endereco':
                this.setState({
                    endereco: event.target.value
                })
                break; 
                case 'bairro':
                this.setState({
                    bairro: event.target.value
                })
                break;
                case 'numero':
                this.setState({
                    numero: event.target.value
                })
                break;
                case 'celular':
                this.setState({
                    celular: event.target.value
                })
                console.log(this.state.celular);
                break;
                case 'medico':
                this.setState({
                    isMedico: !medico
                })
                break; 
                case 'crm':
                this.setState({
                    crm: event.target.value
                })
                break;
                case 'senha':
                this.setState({
                    senha: event.target.value
                })
                break;
                case 'senha2':
                this.setState({
                    senha2: event.target.value
                })
                break;      
            default:
                break;
        }
    }

    render(){
        return(
            <Container>

                <h1>Formulário de Cadastro</h1>

                <form className="form">
                        <input type="text" name="nome" onChange={(event) => this.handlerState(event)} value={this.state.nome} placeholder="Digite seu nome completo" required/>
                        <input type="text" name="email" onChange={(event) => this.handlerState(event)} value={this.state.email} placeholder="Digite seu e-mail" required/>
                        <input type="text" name="cep" onChange={(event) => this.handlerState(event)} value={this.state.cep} placeholder="Digite seu CEP" required/>
                        <input type="text" name="estado" onChange={(event) => this.handlerState(event)} value={this.state.estado} placeholder="Digite sua UF" required/>
                        <input type="text" name="cidade" onChange={(event) => this.handlerState(event)} value={this.state.cidade} placeholder="Digite sua cidade" required/>
                        <input type="text" name="endereco" onChange={(event) => this.handlerState(event)} value={this.state.endereco} placeholder="Digite seu endereço" required/>
                        <input type="text" name="bairro" onChange={(event) => this.handlerState(event)} value={this.state.bairro} placeholder="Digite seu bairro" required/>
                        <input type="text" name="numero" onChange={(event) => this.handlerState(event)} value={this.state.numero} placeholder="Digite o nº da residência" required/>
                        <input type="text" name="celular" onChange={(event) => this.handlerState(event)} value={this.state.celular} placeholder="Digite o seu celular" required/>

                    <div className="div-select">
                        <label>Você é um médico?</label>
                        <select required name="medico" onChange={(event) => this.handlerState(event, this.state.isMedico)} value={this.state.isMedico}>
                            <option value={false}>Não</option>
                            <option value={true}>Sim</option>
                        </select>
                    </div>

                    {this.state.isMedico
                    ? <input type="text" name="crm" onChange={(event) => this.handlerState(event)} value={this.state.crm} placeholder="Digite seu registro no Conselho Regional de Medicina (CRM)" required/>
                    : null}

                    <input type="password" name="senha" onChange={(event) => this.handlerState(event)} value={this.state.senha} placeholder="Crie uma senha" required/>
                    <input type="password" name="senha2" onChange={(event) => this.handlerState(event)} placeholder="Confirme sua senha" required/>

                    <div className="div-botao">
                        <button
                            onClick={() => this.cadastro()} 
                            className="botao">Cadastrar</button>
                    </div>
                </form>
            </Container>
        )
    }
}