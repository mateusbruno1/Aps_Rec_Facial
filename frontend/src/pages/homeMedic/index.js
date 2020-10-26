import React, {Component} from 'react';
import api from '../../services/api';
import medic from '../../assets/svg/medical-doctor.svg';
import moment from 'moment';
import {BsInfoCircle} from 'react-icons/bs';

import {Container} from './styles';
// import { Container } from './styles';

export default class HomeMedic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: moment().format(),
      consultas: [],
      nome: '',
    }
  }

  componentDidMount() {
    const auth = localStorage.getItem('@Auth')
    let data = JSON.parse(auth)
    if(!data){
      data = {
        name: '',
      }
    }
    this.getConsultas();
    this.setState({
      nome: data.name
    })
  }

  logout() {
    localStorage.clear();
    this.redirecionarLogin();
  }

  redirecionarLogin(){
    document.location.href = 'http://127.0.0.1:3000/';
  }

  async getConsultas() {
    const auth = JSON.parse(localStorage.getItem('@Auth'));
    try {
      const consults = await api.get(`/schedule/all`, {
        headers:{
          Authorization: `Bearer ${auth.token}`
        }
      });
      console.log(consults.data);
      this.setState({
        consultas: consults.data
      })
    } catch (error) {
      console.log(error.data);
    }
  }

    render(){
      return(
        <Container>
        <div className="left">
         <div className="perfil">
           <img src={medic} className="perfil-img" />
           <text>Olá, {this.state.nome}!</text>
         </div>
         <button onClick={() => this.logout()} className="botao-sair">Sair</button>
         <label className="version">v 0.0.1</label>
        </div>
        <div className="right">
           <div className="up">
             {this.state.consultas.length >= 1 ?
             <>
             <h1>Fique ligado nas suas próximas consultas!</h1>
             <div className="div-table">
               <table className="table">
                 <tr>
                   <th>Paciente</th>
                   <th>Data e Hora</th>
                 </tr>
               </table>
             <div className="div-table-sla">
               <table className="table2">
                 {
                   this.state.consultas.map(item => (
                     <tr>
                       <td>{item.user.name}</td>
                       <td>{moment(item.date).calendar()}</td>
                     </tr>
                   ))
                 }
               </table>
             </div>
             </div>
             </>
             :
             <>
             <BsInfoCircle color={'#4f877d'} size={45} />
             <h1>Você ainda não tem nenhuma consulta marcada.</h1>
             </>
              }
           </div>
           {/* <div className="down">
             <h1>Agende sua primeira consulta, escolhendo o médico de acordo com sua especialidade</h1>
             <div className="table-down">
              <table className="table-header">
                 <tr>
                    <th className="header">Doutor</th>
                   <th className="header">Especialidade</th>
                   <th className="header">Consultas</th>
                 </tr>
               </table>
               <div className="scroolbar-table-down">
                  <table className="table-body">
                    {
                      this.state.listagem.map(item => (
                        <tr>
                          <td>{item.doutor}</td>
                          <td>{item.especialidade}</td>
                          <td>{item.consultas}</td>
                        </tr>
                      ))
                    }
                  </table>
               </div>

             </div>
           </div> */}
        </div>

      </Container>
   )
    }
}
