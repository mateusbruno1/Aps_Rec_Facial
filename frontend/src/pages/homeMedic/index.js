import React, {Component} from 'react';
import api from '../../services/api';
import medic from '../../assets/svg/medical-doctor.svg';

import {Container} from './styles';
// import { Container } from './styles';

export default class HomeMedic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      consultas: [
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },
        {
          doutor: 'ciclano de tal',
          hora: 'Amanhã'
        },
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },
        {
          doutor: 'Fulano de tal',
          hora: 'Hoje'
        },

      ],
      listagem: [
        {
          doutor: 'fuilano de tal',
          especialidade: 'Clinico geral',
          consultas: 3
        },
        {
          doutor: 'ciclano de tal',
          especialidade: 'Pediatra',
          consultas: 2
        },
        {
          doutor: 'fuilano de tal',
          especialidade: 'Clinico geral',
          consultas: 3
        },
        {
          doutor: 'ciclano de tal',
          especialidade: 'Pediatra',
          consultas: 2
        },
        {
          doutor: 'fuilano de tal',
          especialidade: 'Clinico geral',
          consultas: 3
        },
        {
          doutor: 'ciclano de tal',
          especialidade: 'Pediatra',
          consultas: 2
        },
        {
          doutor: 'fuilano de tal',
          especialidade: 'Clinico geral',
          consultas: 3
        },
        {
          doutor: 'ciclano de tal',
          especialidade: 'Pediatra',
          consultas: 2
        }
      ]
    }
  }

    render(){
      return(
        <Container>
        <div className="left">
         <div className="perfil">
           <img src={medic} className="perfil-img" />
           <text>Olá, Andrey!</text>
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
                   <th>Paciente</th>
                   <th>Data e Hora</th>
                 </tr>
               </table>
             <div className="div-table-sla">
               <table className="table2">
                 {
                   this.state.consultas.map(item => (
                     <tr>
                       <td>{item.doutor}</td>
                       <td>{item.hora}</td>
                     </tr>
                   ))
                 }
               </table>
             </div>
             </div>
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
