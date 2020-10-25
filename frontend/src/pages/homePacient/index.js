import React, {Component} from 'react';
import api from '../../services/api';
import patient from '../../assets/svg/patient.svg';
import moment from 'moment'
import {Container} from './styles';
import Modal from 'react-modal';

export default class HomePacient extends Component {

  constructor(props) {
    super(props);
    this.state = {
      consultas: [],

      listagem: [],

      nome: '',
    }
  }

  componentDidMount(){
    const auth = localStorage.getItem('@Auth')
    const data = JSON.parse(auth)
    this.getConsultas();
    this.getListaMedico();
    this.setState({
      nome: data.name
    })
  }
  async getConsultas(){
    const auth = JSON.parse(localStorage.getItem('@Auth'));
    try {
      const consults =  await api.get('/appointments/next',{
        headers:{
          Authorization: `Bearer ${auth.token}`
        }
      });
      this.setState({
        consultas: consults.data
      })

    } catch (error) {
      console.log(error.data)
    }

  }
  async getListaMedico(){
    const auth = JSON.parse(localStorage.getItem('@Auth'));
    try {
      const list =  await api.get('/medics',{
        headers:{
          Authorization: `Bearer ${auth.token}`
        }
      });
      console.log(list.data);
      this.setState({
        listagem: list.data
      })

    } catch (error) {
      console.log(error.data)
    }

  }
    render(){
        return(
          <Container>
          <div className="left">
           <div className="perfil">
             <img src={patient} className="perfil-img" />
             <text>Olá, {this.state.nome}!</text>
           </div>
           <button className="botao-sair">Sair</button>
           <label className="version">v 0.0.1</label>
          </div>
          <div className="right">
             <div className="up">
               <h1>Fique ligado nas suas próximas consultas!</h1>
               <div className="div-table">
                 <table className="table">
                   <tr>
                     <th>Doutor</th>
                     <th>Data e Hora</th>
                   </tr>
                 </table>
               <div className="div-table-sla">
                 <table className="table2">
                   {
                     this.state.consultas.map(item => (
                       <tr>
                         <td>{item.medic.name}</td>
                         <td>{moment(item.date).calendar()}</td>
                       </tr>
                     ))
                   }
                 </table>
               </div>
               </div>
             </div>
             <div className="down">
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
                            <td>{item.name}</td>
                            <td>{item.especiality}</td>
                            <td>{item.quantity_consults}</td>
                          </tr>
                        ))
                      }
                    </table>
                 </div>

               </div>
             </div>
          </div>

        </Container>
     )
 }
}
