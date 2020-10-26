import React, {Component} from 'react';
import api from '../../services/api';
import patient from '../../assets/svg/patient.svg';
import moment from 'moment'
import {Container, Modal as ModalContainer} from './styles';
import Modal from 'react-modal';
import {BsInfoCircle} from 'react-icons/bs';
import {MdClose} from 'react-icons/md';
import DatePicker from 'react-date-picker';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  content : {
    width: '600px',
    height: '500px',
    maxWidth: '100%',
    maxHeight: '100%',
    padding: 0,
    backgroundColor: '#eaf3ff',
    borderRadius: '16px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const dataHoje = new Date();
const daqui30dias = dataHoje.setDate(dataHoje.getDate() + 30);
export default class HomePacient extends Component {

  constructor(props) {
    super(props);
    this.state = {
      consultas: [],
      listagem: [],
      nome: '',
      isOpen: true,
      data: null,
      horarios: [],
      idMedico: 0,
      hora: '',
    }
  }

  handleModal(value) {
    this.setState({
      isOpen: !value
    })
  }

  handleClick(value, id) {
    this.handleModal(value);
    this.setState({
      idMedico: id
    })
  }

  logout() {
    localStorage.clear();
    this.redirecionarLogin();
  }

  redirecionarLogin(){
    document.location.href = 'http://127.0.0.1:3000/';
  }

  componentDidMount(){
    const auth = localStorage.getItem('@Auth')
    let data = JSON.parse(auth)
    if(!data){
      data = {
        name: '',
      }
    }
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
      this.setState({
        listagem: list.data
      })

    } catch (error) {
      console.log(error.data)
    }

  }
  async checkAvailable(id) {
    const auth = await JSON.parse(localStorage.getItem('@Auth'));
    const date = moment(new Date()).format();
    try {
      const check =  await api.get(`/medic/${this.state.idMedico}/available?date=${date}`,{
        headers:{
          Authorization: `Bearer ${auth.token}`
        }
      });
      console.log(check.data);
      this.setState({
        horarios: check.data
      })

    } catch (error) {
      console.log(error.data)
    }
  }

  async handlerCalendar(data) {
    this.setState({
      data: data
    });
    this.checkAvailable();
  }

  async confirmar() {
    const auth = await JSON.parse(localStorage.getItem('@Auth'));
    let dataErrada = moment(this.state.data).format()
    let dataCerta = dataErrada.toString().slice(0, 10);
    console.log(this.state.idMedico)
    let params = {
      medic_id: this.state.idMedico,
      date: `${dataCerta}T${this.state.hora}:00-03:00`
    }
    try {
      const confirm =  await api.post(`/appointments`, params, {
        headers:{
          Authorization: `Bearer ${auth.token}`
        }
      });
      console.log(confirm.data);
      this.getConsultas();
      this.setState({
        isOpen: false
      })
    } catch (error) {
      console.log(error.data)
    }
  }

    render(){
        return(
          <Container>
            <Modal
              id="modal"
              isOpen={this.state.isOpen}
              onRequestClose={() => this.handleModal(this.state.isOpen)}
              style={customStyles}
              contentLabel="Modal">
                <ModalContainer>
                  <button
                    onClick={() => this.handleModal(this.state.isOpen)}
                    className="button-close">
                  <MdClose color={'#314f72'} size={22} />
                  </button>
                <label>Selecione uma data</label>
                <DatePicker
                  minDate={new Date()}
                  locale="pt-BR"
                  onChange={res => this.handlerCalendar(res)}
                  value={this.state.data}
                />
                <label>Selecione um horário</label>
                <div className="div-horarios">
                {
                  this.state.horarios.map(item => (
                    <button
                      className={item.available ? "horario-disponivel" : "horario-indisponivel"}
                      onClick={() => item.available ? this.setState({hora: item.time}) : null}
                      >{item.time}</button>
                  ))
                }
                </div>
                <h3>Sua consulta será marcada dia {this.state.data === null ? '--/--/----' : moment(this.state.data).format('l')} às {this.state.hora === '' ? '--:--' : this.state.hora}.</h3>
                {
                  this.state.hora === '' || this.state.data === null ?
                  null
                  :
                  <button
                  className="button-modal"
                  onClick={() => this.confirmar()}>Confirmar</button>
                }
                </ModalContainer>
            </Modal>
          <div className="left">
           <div className="perfil">
             <img src={patient} className="perfil-img" />
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
               </>
               :
                <>
                <BsInfoCircle color={'#314f72'} size={45} style={{marginTop: 30}} />
                <h1>Você ainda não tem nenhuma consulta marcada.</h1>
                </>
               }
             </div>
             <div className="down">
               <h1>Agende uma consulta escolhendo o médico de acordo com sua especialidade.</h1>
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
                          <tr onClick={() => this.handleClick(this.state.isOpen, item.id)}>
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
